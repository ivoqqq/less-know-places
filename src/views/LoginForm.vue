<template>
  <div id="loginform" class="modal-form" v-show="value">
    <form class="form-content" @submit.prevent>
      <div class="modal-container">
        <p class="fire-error" v-if="error">{{ error }}</p>

        <h1 class="title">Log in</h1>
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
          <button class="cancel-btn" @click="clearInputFields(), close()">
            Cancel
          </button>
          <button class="login-btn" @click="login()">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { authService } from "../services/authService";

export default {
  mixins: [ authService ],
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    close() {
      this.$emit("closeForm", false);
      // this.$router.replace("/").catch(() => {});
    },
    clearInputFields() {
      this.email = "";
      this.password = "";
      this.error = null;
    },
    login() {
      this.userLogin();
    },
  },
};
</script>

<style lang="scss" scoped>

.modal-form {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  animation: animatezoom 0.3s;

  .form-content {
    border-radius: 4px;
    background-color: rgba(20, 23, 27, 0.9);
    margin: 100px auto;
    width: 40%;
    max-width: 500px;
    min-width: 300px;

    .modal-container {
      padding: 15px;
    }
    .title {
      color: white;
      opacity: 0.9;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
      margin-bottom: 20px;
    }
    .clearfix::after {
      content: "";
      clear: both;
      display: table;
    }
  }
}
@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
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
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  font-size: 16px;

  &:hover {
    opacity: 1;
  }
}
.cancel-btn {
  background-color: crimson;
  border-radius: 4px 0 0 4px;
}
.login-btn {
  border-radius: 0 4px 4px 0;
}
.cancel-btn,
.login-btn {
  float: left;
  width: 50%;
}
.error {
  color: crimson;
  font-weight: 700;
  position: absolute;
  transform: translateY(-10px);
}
.fire-error {
  color: crimson;
  font-weight: 700;
  font-size: 16px;
}
</style>