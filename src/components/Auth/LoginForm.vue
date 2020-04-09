<template>
  <div id="loginform" class="modal-form" v-show="value">
    <form class="form-content" @submit.prevent>
      <div class="container">
        <h1 class="error" v-if="error">{{error}}</h1>
        <h1 class="title" v-else>Log in</h1>

        <input type="text" placeholder="Your email" v-model="email"/>

        <input type="password" placeholder="Your password" v-model="password"/>

        <div class="clearfix">
          <button class="cancelbtn" @click="clearInputFields(), close()">Cancel</button>
          <button class="loginbtn" @click="login()">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { authService } from "../Services/authService"

export default {
  mixins: [authService],
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    close() {
      this.$emit("closeForm", false);
      this.$router.replace("/").catch(() => {});
    },
    clearInputFields() {
      this.email = "";
      this.password = "";
      this.error = null;
    },
    login(){
      this.userLogin()
    }
  }
};
</script>

<style scoped>
* {
  outline: none;
}
.title {
  color: white;
  opacity: 0.7;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
.error {
  color: red;
  font-size: 24px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
/* Full-width input fields */
input[type="text"],
input[type="password"] {
  color: white;
  width: 100%;
  margin: 5px 0 22px 0;
  display: inline-block;
  height: 20px;
  background: transparent;
  border-color: transparent;
  border-bottom: 1px solid olive;
}
button {
  background-color: olive;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
button:hover {
  opacity: 1;
}
.cancelbtn {
  background-color: #e60f00;
  border-radius: 5px 0 0 5px;
}
.loginbtn {
  border-radius: 0 5px 5px 0;
}
.cancelbtn,
.loginbtn {
  float: left;
  width: 50%;
}
.container {
  padding: 15px;
}
/* The Modal (background) */
.modal-form {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  right: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-animation: animatezoom 0.3s;
  animation: animatezoom 0.3s;
}
/* Modal Content/Box */
.form-content {
  border-radius: 10px;
  box-shadow: 0 0 20px 0px rgba(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.1);
  margin: 15% auto 10% auto; /* 5% from the top, 15% from the bottom and centered */
  width: 30%; /* Could be more or less, depending on screen size */
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
/* ------------------------------- */

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>