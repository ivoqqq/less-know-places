import Vue from "vue";
import App from "./App.vue";
import Vuelidate from 'vuelidate'
import firebase from "firebase";
import router from "./router/router";

Vue.use(Vuelidate)

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyAo1cDb17-oa1qqaSjc-nbqZX4hCSmovHY",
  authDomain: "lessknownplaces.firebaseapp.com",
  projectId: "lessknownplaces",
  storageBucket: "lessknownplaces.appspot.com",
  messagingSenderId: "389063040372",
  appId: "1:389063040372:web:90cd21c6ff1bfa23536021",
  measurementId: "G-1C1E9MBMPH"
};

firebase.initializeApp(configOptions);

let app = ""
firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});


