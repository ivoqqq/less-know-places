import Vue from "vue";
import App from "./App.vue";
import Vuelidate from 'vuelidate'
import * as firebase from "firebase";
import router from "./router";

Vue.use(Vuelidate)

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyAVLSTiGdFU0vpUaCAvZDZfSxNRW8je6Qg",
  authDomain: "hit-the-road-bea36.firebaseapp.com",
  databaseURL: "https://hit-the-road-bea36.firebaseio.com",
  projectId: "hit-the-road-bea36",
  storageBucket: "hit-the-road-bea36.appspot.com",
  messagingSenderId: "561915196823",
  appId: "1:561915196823:web:2a79d11182759aca8440d2",
  measurementId: "G-H88J9NZNXW"
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


