<template>
  <div>
    <div class="wrapper">
      <div class="burger" @click="activeNavBar = !activeNavBar, menuAnimate($event)">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-bar">
        <ul v-show="activeNavBar">
          <router-link
            to="/"
            class="link"
            active-class
            exact
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
          >HOME</router-link>

          <router-link
            to="/hit-the-road"
            class="link"
            active-class
            exact
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
          >HitTheRoad</router-link>

          <router-link
            to="/create"
            class="link"
            active-class
            exact
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
          >Create</router-link>

          <router-link
            to="/profile"
            class="link"
            active-class
            exact
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
          >Profile</router-link>

          <!-- <router-link
            to="/return"
            class="link"
            active-class
            exact
            @mouseover.native="animeMouseOverLink($event)"
            @mouseout.native="animeMouseOutLink($event)"
          >Return</router-link> -->
        </ul>
      </div>
    </div>
    <div class="btns">
      <div class="loginbtn">
        <button class="btn" v-if="loginBtn" @click="openLoginForm()">Login</button>
        <button class="btn" v-else @click="logOut()">Logout</button>

        <app-login-form
          v-model="isLoginFormOpen"
          @logout="logShift()"
          @closeForm="isLoginFormOpen=$event"
        ></app-login-form>
      </div>
      <div class="signupbtn">
        <button class="btn" @click="openSignupForm()" :disabled="disableButton">Sign up</button>

        <!-- <app-signup-form v-model="isSignupFormOpen" @closeForm="isSignupFormOpen=$event"></app-signup-form> -->
        <app-signup-form
          v-bind:value="isSignupFormOpen"
          v-on:input="isSignupFormOpen = $event.target.value"
          @closeForm="isSignupFormOpen = $event"
        ></app-signup-form>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import AppLoginForm from "./Auth/LoginForm";
import AppSignupForm from "./Auth/SignupForm";
import { authService } from "./Services/authService"
import * as firebase from "firebase";


export default {
  components: {
    AppLoginForm,
    AppSignupForm
  },
  mixins: [authService],
  data() {
    return {
      activeNavBar: false,
      isLoginFormOpen: false,
      isSignupFormOpen: false,
      loginBtn: firebase.auth().currentUser === null,
    };
  },
  methods: {
    logShift(a) {
      this.loginBtn = a;
    },
    logOut() {
      this.userLogout()
    },
    openLoginForm() {
      this.isLoginFormOpen = true;
    },
    openSignupForm() {
      this.isSignupFormOpen = true;
    },
    animeMouseOverLink(e) {
      anime({
        targets: e.target,
        translateX: 50,
        scale: 1.3,
        duration: 1000,
        color: "#e60f00"
      });
    },
    animeMouseOutLink(e) {
      anime.remove(e.target);
      anime({
        targets: e.target,
        translateX: 50,
        scale: 1,
        duration: 1000,
        color: "#ffffff"
      });
    },
    menuAnimate(e) {
      if (this.activeNavBar) {
        //menu animation
        anime({
          targets: ".link",
          delay: function(el, i) {
            return i * 100;
          },
          translateX: [0, 50],
          easing: "easeOutExpo",
          opacity: [0, 1]
        });

        //burger animation
        anime({
          targets: ".burger",
          rotate: {
            value: 450
          },
          duration: 700,
          easing: "easeInOutCubic"
        });
        anime({
          targets: document.querySelector("span"),
          translateX: 10,
          delay: 500,
          width: 15
        });
        anime({
          targets: document.querySelectorAll("span")[1],
          translateX: 5,
          delay: 500,
          width: 25,
          backgroundColor: "#e60f00"
        });
      } else {
        anime.remove(e.target);
        //burger animation reverse
        anime({
          targets: "span",
          rotate: {
            value: 0
          }
        });
        anime({
          targets: ".burger",
          rotate: {
            value: 0
          }
        });
        anime({
          targets: document.querySelector("span"),
          translateX: 0,
          width: 35
        });
        anime({
          targets: document.querySelectorAll("span")[1],
          translateX: 0,
          width: 35,
          backgroundColor: "#fff"
        });
      }
    }
  },
  computed: {
    disableButton: function() {
      return this.loginBtn === true ? false : true;
    }
  }
};
</script>

<style scoped>
* {
  outline: none;
}
.router-link-exact-active {
  border: 2px solid white;
  border-radius: 5px;
}
.wrapper {
  float: left;
  width: 90.5%;
}
.btns {
  display: table;
  width: 8%;
  float: right;
  border: 1px solid white;
  height: 30px;
  margin: 10px 10px;
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
  display: block;
  margin: 0px;
  text-align: center;
}
ul {
  margin-top: 0px;
  padding-top: 5px;
  height: 50px;
}

.link {
  font-family: "Bauhaus 93", sans-serif;
  display: inline-block;
  font-size: 24px;
  color: white;
  list-style-type: none;
  text-decoration: none;
  padding: 0 30px 0 30px;
}

/* burger */
.burger {
  width: 35px;
  height: 30px;
  margin: 10px 10px;
  position: relative;
  cursor: pointer;
  float: left;
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
span {
  color: gold;
  font-size: 22px;
}
</style>
