<template>
  <div id="signupform" class="modal-form" v-show="value">
    <form class="form-content" @submit.prevent>
      <div class="modal-container">
        <p class="fib-error" v-if="error">{{ error }}</p>

        <h1 class="title">Register form</h1>

        <div class="error" v-if="$v.username.$error">
          <p v-if="!$v.username.minLength">Must be at least 3 characters</p>
          <p v-if="!$v.username.required">Please fill in username</p>
        </div>
        <input
          type="text"
          placeholder="Your username"
          @blur="$v.username.$touch()"
          v-model="username"
        />

        <div class="error" v-if="$v.email.$error">
          <p v-if="!$v.email.email">Please fill in a valid email</p>
          <p v-if="!$v.email.required">Please fill in email</p>
        </div>
        <input
          type="text"
          placeholder="Your email"
          @blur="$v.email.$touch()"
          v-model="email"
        />

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
          <button class="cancelbtn" @click="clearInputFields(), close()">
            Cancel
          </button>
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
      require: true,
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    close() {
      this.$emit("closeForm", false);
      // this.$router.replace("/").catch(() => {});
    },
    clearInputFields() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.error = null;
    },
    register() {
      this.userRegistration();
    },
  },
};
</script>
<style scoped>
.title {
  color: white;
  opacity: 0.7;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  margin-bottom: 20px;
}
input[type="text"],
input[type="password"] {
  color: white;
  width: 100%;
  margin: 15px 0 22px 0;
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
  background-color: crimson;
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
.modal-container {
  padding: 15px;
}
.modal-form {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-animation: animatezoom 0.3s;
  animation: animatezoom 0.3s;
}
.form-content {
  border-radius: 10px;
  background-color: rgba(20, 23, 27, 0.9);
  margin: 100px auto;
  width: 40%;
  min-width: 400px;
}
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
.error {
  color: crimson;
  font-weight: 700;
  position: absolute;
  transform: translateY(-10px);
}
.fib-error {
  color: crimson;
  font-weight: 700;
  font-size: 16px;
}
</style>