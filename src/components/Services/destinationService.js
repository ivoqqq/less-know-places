import firebase from "firebase";
import router from "../../router/router"
import { uuidv4Gen } from "./file-name-uuidv4-generator";
const Compress = require("compress.js");

export let destinationService = {
    data() {
        return {
            collection: firebase.firestore().collection("places")
        };
    },
    methods: {
        createData() {
            this.collection
                .add(this.place)
                .then(() => {
                    router.push("/hit-the-road")
                })
                .catch(error => {
                    alert("Error adding document: ", error);
                });
        },
        setData() {
            this.collection
                .doc(this.$route.params.id)
                .set(this.place)
                .then(() => {
                    // router.push({ name: "Details", params: { id: this.$route.params.id } });
                    router.push("/profile");
                })
        },
        delData(id, imgUrl) {
            firebase.storage().refFromURL(imgUrl).delete() //replace with the method at the bottom
            this.collection
                .doc(id)
                .delete()
                .then(() => {
                    router.push("/hit-the-road");
                })
                .catch(err => console.log(err))

        },
        getData() {
            this.collection
                .doc(this.$route.params.id)
                .get()
                .then(doc => {
                    this.docID = doc.id;
                    this.place = doc.data();
                });
        },
        getQueryData() {
            this.collection
                // .orderBy("rating")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.places.push({
                            docID: doc.id,
                            userID: doc.data().id,
                            username: doc.data().username,
                            title: doc.data().title,
                            description: doc.data().description,
                            photo: doc.data().photo,
                        })
                    });
                })
        },
        getQueryDataProfile() {
            this.collection
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (firebase.auth().currentUser.uid === doc.data().userID) {
                            this.places.push({
                                docID: doc.id,
                                userID: doc.data().id,
                                username: doc.data().username,
                                title: doc.data().title,
                                description: doc.data().description,
                                photo: doc.data().photo,
                            });
                        }
                    });
                });
        },
        addFile(event) {
            
            // compress file before upload
            const compress = new Compress();
            const fileForCompression = [event.target.files[0]]
            compress
                .compress(fileForCompression, {
                    size: 4,
                    quality: 0.75,
                })
                .then((result) => {
                    let img1 = result[0]
                    let base64str = img1.data
                    let imgExt = img1.ext
                    let blobFile = Compress.convertBase64ToFile(base64str, imgExt)
                    blobFile.lastModifiedDate = new Date();
                    blobFile.name = fileName

                    this.imageData = blobFile
                    this.progress = 0;
                    
                    let fileName = uuidv4Gen()

                    let file = new File([this.imageData], fileName + ".jpg", {
                        type: "image/jpeg",
                    });
                    //copmatable chrome; edge: 01.2020...; IE: no;
                    //formData.append() is older => more compatable

                    const storageRef = firebase.storage().ref(`${file.name}`).put(file); //expected Blob or File

                    storageRef.on(
                        `state_changed`,
                        (snapshot) => {
                            //the task of uploading
                            this.file = "UPLOADING...";
                            this.progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        },
                        (error) => {
                            console.log(error.message);
                        },
                        () => {
                            storageRef.snapshot.ref.getDownloadURL().then((url) => {
                                this.place.photo = url;
                                this.file = "UPLOADED";
                                this.finishedUploadTask = 1
                            });
                        }
                    );
                });
        },
        deleteImage(imgUrl) {
            firebase.storage().refFromURL(imgUrl).delete()
        }
    },
}