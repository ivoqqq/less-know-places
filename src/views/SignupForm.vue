<template>
  <div id="signupform" class="modal-form" v-show="value">
    <form class="form-content" @submit.prevent>
      <div class="modal-container">
        <p class="fire-error" v-if="error">{{ error }}</p>

        <h1 class="title">Register form</h1>

        <div class="error" v-if="$v.username.$error">
          <p v-if="!$v.username.minLength">At least 3 characters</p>
          <p v-if="!$v.username.maxLength">Maximum 10 characters</p>
          <p v-if="!$v.username.required">Please fill in username</p>
        </div>
        <input
          type="text"
          placeholder="Your username"
          @blur="$v.username.$touch()"
          v-model="username"
        />

        <div class="error" v-if="$v.email.$error">
          <p v-if="!$v.email.minLength">At least 3 characters</p>
          <p v-if="!$v.email.maxLength">Maximum 20 characters</p>
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
          <button class="register-btn" @click="register()">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, maxLength } from "vuelidate/lib/validators";
import { authService } from "@/services/authService";

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
      maxLength: maxLength(10),
    },
    email: {
      required,
      email,
      minLength: minLength(3),
      maxLength: maxLength(20),
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
<style lang="scss" scoped>
@import "@/styles/inputs";

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

button {
  background-color: olive;
  color: white;
  padding: 12px 0;
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
  border-radius: 2px 0 0 2px;
}
.register-btn {
  border-radius: 0 2px 2px 0;
}
.cancel-btn,
.register-btn {
  float: left;
  width: 50%;
}
.fire-error {
  color: crimson;
  font-weight: 600;
  font-size: 16px;
}
</style>