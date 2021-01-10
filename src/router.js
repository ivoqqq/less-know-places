import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

import Home from "./components/Roads/Home";
import HitTheRoad from "./components/Roads/HitTheRoad";
import Create from "./components/Roads/Create";
import UserProfile from "./components/Roads/UserProfile"
import Details from "./components/Roads/Details";
import Edit from "./components/Roads/Edit";
// import Return from "./components/Roads/Return"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/", name: "HOME", component: Home },
    { path: "/hit-the-road", name: "HitTheRoad", component: HitTheRoad, meta: { requiresAuth: true } },
    { path: "/create", name: "Create", component: Create, meta: { requiresAuth: true } },
    { path: "/profile", name: "Profile", component: UserProfile, meta: { requiresAuth: true } },
    { path: "/details/:id", name: "Details", component: Details, },
    { path: "/edit/:id", name: "Edit", component: Edit },
  ],
  mode: "history",
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    alert("to visit this page you have to login first")
    next("/")
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router