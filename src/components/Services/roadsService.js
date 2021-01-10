import firebase from "firebase";
import router from "../../router"
export let roadService = {
    data() {
        return {
            road: {
                id: firebase.auth().currentUser.uid,
                startpoint: "",
                startimage: "",
                endpoint: "",
                endimage: "",
                expectations: "",
                username: firebase.auth().currentUser.displayName
            }
        };
    },
    methods: {
        createData() {
            firebase
                .firestore()
                .collection("roads")
                .add(this.road)
                .then(() => {
                    router.push("/hit-the-road")
                })
                .catch(error => {
                    alert("Error adding document: ", error);
                });
        },
        setData() {
            firebase
                .firestore()
                .collection("roads")
                .doc(this.$route.params.id)
                .set(this.road)
                .then(() => {
                    // router.push({ name: "Details", params: { id: this.$route.params.id } });
                    router.push("/hit-the-road");
                })
        },
        delData(id) {
            firebase
                .firestore()
                .collection("roads")
                .doc(id)
                .delete()
                .then(() => {
                    router.push("/hit-the-road");
                });
        },
        getData() {
            firebase
                .firestore()
                .collection("roads")
                .doc(this.$route.params.id)
                .get()
                .then(doc => {
                    this.docID = doc.id;
                    this.road = doc.data();
                });
        },
        getQueryData() {
            firebase
                .firestore()
                .collection("roads")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.roads.push({
                            docID: doc.id,
                            userID: doc.data().id,
                            username: doc.data().username,
                            startpoint: doc.data().startpoint,
                            endpoint: doc.data().endpoint,
                            expectations: doc.data().expectations,
                            startimage: doc.data().startimage,
                            endimage: doc.data().endimage
                        });
                    });
                });
        },
        getQueryDataProfile(){
            firebase
            .firestore()
            .collection("roads")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
          if (firebase.auth().currentUser.uid === doc.data().id) {

                    this.roads.push({
                        docID: doc.id,
                        userID: doc.data().id,
                        username: doc.data().username,
                        startpoint: doc.data().startpoint,
                        endpoint: doc.data().endpoint,
                        expectations: doc.data().expectations,
                        startimage: doc.data().startimage,
                        endimage: doc.data().endimage
                    });
                }
                });
            });
        }
    },
}