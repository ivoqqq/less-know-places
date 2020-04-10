<template>
  <div id="signupform" class="modal-form" v-show="value">
    <form class="form-content" @submit.prevent>
      <div class="container">
        <h1 class="error" v-if="error">{{error}}</h1>
        
        <h1 class="title">Register form</h1>

        <div class="error" v-if="$v.name.$error">
          <p v-if="!$v.name.minLength">Must be at least 3 characters</p>
          <p v-if="!$v.name.required">Please fill in username</p>
        </div>
        <input type="text" placeholder="Your username" @blur="$v.name.$touch()" v-model="username" />

        <div class="error" v-if="$v.email.$error">
          <p v-if="!$v.email.email">Please fill in a valid email</p>
          <p v-if="!$v.email.required">Please fill in email</p>
        </div>
        <input type="text" placeholder="Your email" @blur="$v.email.$touch()" v-model="email" />

        <div class="error" v-if="$v.password.$error">
          <p v-if="!$v.password.minLength">Must be at least 6 characters</p>
          <p v-if="!$v.password.required">Please fill in password</p>
        </div>
        <input
          type="password"
          placeholder="Your password"
          @blur="$v.password.$touch()"
          v-model="password"
        />

        <div class="clearfix">
          <button class="cancelbtn" @click="clearInputFields(), close()">Cancel</button>
          <button class="regbtn" @click="register()">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { authService } from "../Services/authService";

export default {
  mixins: [authService],
  props: {
    value: {
      require: true
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    close() {
      this.$emit("closeForm", false);
      this.$router.replace("/").catch(() => {});
    },
    clearInputFields() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.error = null;
    },
    register() {
      this.userRegistration();
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
.regbtn {
  border-radius: 0 5px 5px 0;
}
.cancelbtn,
.regbtn {
  float: left;
  width: 50%;
}
.container {
  padding: 15px;
}
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
/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>