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
      <p class="logInBtn" v-if="isLogged" @click="openLoginForm">Login</p>
      <p class="logOutBtn" v-else @click="logOut">Logout</p>
      <p class="signUpBtn" v-if="isLogged" @click="openSignupForm">SignUp</p>
    </div>
    <app-login-form
      v-model="isLoginFormOpen"
      @logout="logShift($event)"
      @closeForm="isLoginFormOpen = $event"
    ></app-login-form>
    <app-signup-form
      v-bind:value="isSignupFormOpen"
      v-on:input="isSignupFormOpen = $event.target.value"
      @closeForm="isSignupFormOpen = $event"
    ></app-signup-form>
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
      isLogged: firebase.auth().currentUser === null,
      routes: this.$router.options.routes.slice(0, 4),
    };
  },
  methods: {
    logShift(a) {
      this.isLogged = a;
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
    menuAnimate() {
      this.menu();
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Bauhaus 93";
  src: local("Bauhaus 93"), url("../assets/BAUHS93.ttf") format("truetype");
}

$hover-color: goldenrod;
$elements-height: 30px;
.name {
  color: white;
  float: right;
}
.menu-container {
  position: fixed;
  left: 0;
  top: 0;
  min-width: 350px;
  width: 100%;
  z-index: 100;
}
.btns {
  display: table;
  height: $elements-height;
  float: right;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  margin: 8px 10px;

  $btns: logInBtn, logOutBtn, signUpBtn;

  @each $btn in $btns {
    & .#{$btn} {
      width: 50px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      padding: 0 4px;
      transition: ease 0.2s;

      &:hover {
        background-color: olive;
        cursor: pointer;
        border-radius: 2px;
      }
    }
  }
  .signUpBtn {
    border-left: 1px solid white;
  }
}
ul {
  width: 100%;
  height: 50px;
  text-align: center;
  position: absolute;
  background-color: #000000;
  z-index: -1;
  transition: ease 0.1s;
  border-bottom: 2px solid rgba(218, 165, 32, 0.075);

  .link {
    font-family: "Bauhaus 93";
    font-size: 24px;

    height: 35px;
    display: inline-block;
    color: white;
    text-decoration: none;
    margin: 6px 2%;
    padding: 0 1%;

    &:hover {
      color: $hover-color;
    }
  }
  .router-link-exact-active {
    color: $hover-color;
    border-bottom: 2px solid $hover-color;
  }
}

@media screen and (max-width: 700px) {
  ul {
    height: 200px;
    width: 100%;

    & .link {
      display: block;
      width: fit-content;
      margin: 10px auto 10px;
    }
  }
}

/* burger */
.burger {
  width: 35px;
  height: $elements-height;
  margin: 12px 10px;
  position: relative;
  cursor: pointer;
  float: left;

  span {
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;

    @for $i from 0 through 2 {
      &:nth-child(#{$i + 1}) {
        top: $i * 10px;
      }
    }
  }
}
</style>