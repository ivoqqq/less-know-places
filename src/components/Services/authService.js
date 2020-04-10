import * as firebase from "firebase";

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
                    this.$router.replace("/hit-the-road").catch(() => { });
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
                    this.loginBtn = true;
                });
        },
        userData() {
            if (firebase.auth().currentUser !== null) {
                this.username = firebase.auth().currentUser.displayName
            }
        }
    }
}