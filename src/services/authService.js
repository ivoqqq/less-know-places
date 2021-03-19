import firebase from "firebase/app";

export let authService = {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            error: null
        }
    },
    methods: {
        userRegistration() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(data => {
                    data.user
                        .updateProfile({
                            displayName: this.username
                        })
                })
                .then(() => {
                    this.$emit("closeForm", false);
                    this.clearInputFields()
                    firebase.auth().signOut()
                })
                .catch(err => {
                    this.error = err.message;
                });
        },
        userLogin() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$emit("logout", false);
                    this.$emit("closeForm", false);
                    this.clearInputFields();
                })
                .catch(err => {
                    this.error = err.message;
                });
        },
        userLogout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push("/").catch(() => { });
                    this.isLogged = true;
                });
        },
        currentUserID() {
            if (firebase.auth().currentUser !== null) {
                return firebase.auth().currentUser.uid
            }
        },
        currentUsername() {
            if (firebase.auth().currentUser !== null) {
                return firebase.auth().currentUser.displayName
            }
        }
    }
}