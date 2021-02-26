import firebase from "firebase";
import router from "../../router"
import { uuidv4Gen } from "./file-name-uuidv4-generator";

export let roadService = {
    data() {
        return {
            road: {
                id: firebase.auth().currentUser.uid,
                username: firebase.auth().currentUser.displayName,
                startpoint: "",
                startimage: "",
                expectations: "",
            },
            collection: firebase.firestore().collection("roads")
        };
    },
    methods: {
        createData() {
            this.collection
                .add(this.road)
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
                .set(this.road)
                .then(() => {
                    // router.push({ name: "Details", params: { id: this.$route.params.id } });
                    router.push("/hit-the-road");
                })
        },
        delData(id) {
            this.collection
                .doc(id)
                .get()
                .then(doc => {
                    let url = doc.data().startimage
                    firebase.storage().refFromURL(url).delete()
                })
                .then(() => {
                    this.collection
                        .doc(id)
                        .delete()
                        .then(() => {
                            router.push("/hit-the-road");
                        });
                })
                .catch(err => console.log(err))

        },
        getData() {
            this.collection
                .doc(this.$route.params.id)
                .get()
                .then(doc => {
                    this.docID = doc.id;
                    this.road = doc.data();
                });
        },
        getQueryData() {
            this.collection
                // .orderBy("rating")
                .get()
                .then(querySnapshot => {
                    console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                        this.roads.push({
                            docID: doc.id,
                            userID: doc.data().id,
                            username: doc.data().username,
                            startpoint: doc.data().startpoint,
                            expectations: doc.data().expectations,
                            startimage: doc.data().startimage,
                        });
                    });
                })
        },
        getQueryDataProfile() {
            this.collection
                .get()
                .then(querySnapshot => {
                    console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                        if (firebase.auth().currentUser.uid === doc.data().id) {

                            this.roads.push({
                                docID: doc.id,
                                userID: doc.data().id,
                                username: doc.data().username,
                                startpoint: doc.data().startpoint,
                                expectations: doc.data().expectations,
                                startimage: doc.data().startimage,
                            });
                        }
                    });
                });
        },
        addFile(event) {
            this.progress = 0;
            this.imageData = event.target.files[0];
            let fileName = uuidv4Gen()

            var file = new File([this.imageData], fileName + ".jpg", {
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
                        this.road.startimage = url;
                        this.file = "UPLOADED";
                        this.finishedUploadTask = 1
                    });
                }
            );
        }
    },
}