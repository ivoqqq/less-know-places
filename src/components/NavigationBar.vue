<template>
  <div class="menu-container">
    <div class="nav-bar-container">
      <div
        class="burger"
        @click="(activeNavBar = !activeNavBar), menuAnimate($event)"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-bar">
        <ul v-show="activeNavBar">
          <router-link
            class="link"
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            >{{ route.name }}</router-link
          >
        </ul>
      </div>
    </div>
    <div class="btns">
      <div class="loginbtn">
        <button class="btn" v-if="loginBtn" @click="openLoginForm">
          Login
        </button>
        <button class="btn" v-else @click="logOut">Logout</button>
      </div>
      <div class="signupbtn">
        <button class="btn" @click="openSignupForm" :disabled="disableButton">
          Sign up
        </button>
      </div>

      <app-login-form
        v-model="isLoginFormOpen"
        @logout="logShift()"
        @closeForm="isLoginFormOpen = $event"
      ></app-login-form>
      <app-signup-form
        v-bind:value="isSignupFormOpen"
        v-on:input="isSignupFormOpen = $event.target.value"
        @closeForm="isSignupFormOpen = $event"
      ></app-signup-form>
    </div>
  </div>
</template>

<script>
import AppLoginForm from "./Auth/LoginForm";
import AppSignupForm from "./Auth/SignupForm";
import firebase from "firebase";
import { authService } from "./Services/authService";
import { animation } from "../nav-bar-anime-mixins";

export default {
  components: {
    AppLoginForm,
    AppSignupForm,
  },
  mixins: [authService, animation],
  data() {
    return {
      activeNavBar: false,
      isLoginFormOpen: false,
      isSignupFormOpen: false,
      loginBtn: firebase.auth().currentUser === null,
      routes: this.$router.options.routes.slice(0, 4),
    };
  },
  methods: {
    logShift(a) {
      this.loginBtn = a;
    },
    logOut() {
      this.userLogout();
    },
    openLoginForm() {
      this.isLoginFormOpen = true;
    },
    openSignupForm() {
      this.isSignupFormOpen = true;
    },
    animeMouseOverLink(e) {
      this.mouseOverLink(e);
    },
    animeMouseOutLink(e) {
      this.mouseOutLink(e);
    },
    menuAnimate(e) {
      this.menu(e);
    },
  },
  computed: {
    disableButton: function () {
      return this.loginBtn === true ? false : true;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
}
.nav-bar-container {
  width: calc(100% - 160px);
  position: absolute;
}
.btns {
  display: table;
  width: 100px;
  float: right;
  border: 1px solid white;
  height: 30px;
  margin: 10px;
}
.signupbtn,
.loginbtn {
  display: table-cell;
  text-align: center;
  width: 50%;
}
.signupbtn:hover,
.loginbtn:hover {
  background-color: olive;
}
.signupbtn {
  border-left: 1px solid white;
}
button {
  background-color: transparent;
  color: white;
  border: none;
  font-size: 14px;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
button:disabled {
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  opacity: 0.8;
}
button:disabled:hover {
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  opacity: 1;
}

.nav-bar {
  padding-top: 5px;
  width: 100%;
  position: absolute;
  text-align: center;
  transform: translateX(50px);
}
.link {
  font-family: "Bauhaus 93", sans-serif;
  display: inline-block;
  font-size: 24px;
  color: white;
  /* list-style-type: none; */
  text-decoration: none;
  padding: 0 2% 0 2%;
}
.router-link-exact-active {
  border: 2px solid white;
  border-radius: 5px;
}
@media screen and (max-width: 760px) {
  .nav-bar {
    width: 150px;
    padding-top: 100px; 
    transform: translateX(10px);
    text-align: left;
  }
  .link {
    margin-bottom: 15%;
    padding: 0 10px 0 10px;
  }
}

/* burger */
.burger {
  width: 35px;
  height: 30px;
  margin: 10px 10px;
  position: relative;
  cursor: pointer;
  float: left;
  z-index: 50;
}
.burger span {
  background-color: #fff;
  position: absolute;
  width: 100%;
  height: 4px;
}
.burger span:nth-child(1) {
  top: 0px;
}
.burger span:nth-child(2) {
  top: 10px;
}
.burger span:nth-child(3) {
  top: 20px;
}
</style>