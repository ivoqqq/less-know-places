<template>
  <div class="create-container">
    <form class="input-form" @submit.prevent="addData">
      <div class="error" v-if="$v.place.title.$error">
        <p v-if="!$v.place.title.minLength">
          Minimum length is 3 characters
        </p>
        <p v-if="!$v.place.title.maxLength">
          Maximum length is 30 characters
        </p>
        <p v-if="!$v.place.title.required">The field can not be empty</p>
      </div>
      <input
        type="text"
        v-model="place.title"
        placeholder="type in place to visit..."
        @blur="$v.place.title.$touch()"
      />
      <div class="error" v-if="$v.place.description.$error">
        <p v-if="!$v.place.description.minLength">
          Minimum length is 6 characters
        </p>
        <p v-if="!$v.place.description.maxLength">
          Maximum length is 200 characters
        </p>
        <p v-if="!$v.place.description.required">The field can not be empty</p>
      </div>
      <input
        class="description"
        type="text"
        placeholder="about the place..."
        v-model="place.description"
        @blur="$v.place.description.$touch()"
      />

      <div class="error" v-if="$v.finishedUploadTask.$error">
        <p v-if="!$v.finishedUploadTask.required">You didn't choose any file</p>
      </div>
      <div class="image-container">
          
        <label for="input-image" class="input-file-label">{{ file }}</label>
        <input
          id="input-image"
          ref="upload"
          @change="uploadFile"
          accept="image/*"
          type="file"
          @blur="$v.finishedUploadTask.$touch()"
        />
      </div>
      <progress
        v-if="progress != null"
        class="progress-bar"
        :value="progress"
        max="100"
      ></progress>
      <button :disabled="$v.$invalid">Create</button>
    </form>
  </div>
</template>

<script>
import { destinationService } from "../Services/destinationService";
import { authService } from "../Services/authService";
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  mixins: [destinationService, authService],
  data() {
    return {
      place: {},
      imageData: null,
      progress: null,
      file: "ADD PICTURE",
      finishedUploadTask: null
    };
  },
  validations: {
    place: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      description: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200),
      },
    },
    finishedUploadTask: {
      required,
      minValue: minValue(1)
    },
  },
  methods: {
    addData() {
      this.createData();
    },
    uploadFile(event) {
      this.addFile(event);
    },
  },
};
</script>

<style scoped>
.create-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.create-container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/bench-with-the-view-in-austrian-mountains-2210x1658.jpg");
  filter: grayscale(50%) brightness(60%);
  z-index: -1;
}
.input-form {
  text-align: center;
  position: relative;
  width: 40%;
  padding: 80px 40px 40px 40px;
}
.input-form::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(20, 23, 27, 0.9);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  z-index: -1;
}

input {
  outline: none;
  color: white;
  width: 100%;
  margin: 5px 0 22px 0;
  display: inline-block;
  height: 30px;
  background: transparent;
  border-color: transparent;
  border-bottom: 2px solid rgba(153, 205, 50, 0.5);
  font-size: 16px;
  opacity: 0.8;
}
input:focus {
  opacity: 1;
}
::placeholder {
  color: goldenrod;
  font-size: 14px;
}
input[type="file"] {
  display: none;
}
.input-file-label {
  display: inline-block;
  line-height: 30px;
  position: relative;
  width: 100px;
  background-color: olive;
  color: white;
  cursor: pointer;
  opacity: 0.8;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
  margin: 5px 0 22px 0;
  padding: 0 5px;
  border-radius: 2px;
}
.input-file-label:hover {
  opacity: 1;
}
progress {
  border: 0;
  text-align: left;
}
progress::-webkit-progress-bar {
  height: 18px;
  width: 100%;
  border-radius: 10px;
  background-color: #ccc;
  box-shadow: 0px 0px 6px #777 inset;
  padding: 2px;
}
progress::-webkit-progress-value {
  display: inline-block;
  height: 14px;
  background: rgb(6, 112, 112);
  border-radius: 10px;
  box-shadow: 0px 0px 6px #777 inset;
}
button {
  width: 100%;
  height: 40px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 22px;
  transition: all 0.1s ease-in-out;
  border-radius: 4px;
  position: relative;
  bottom: 0;
  margin: 20px 0 auto;
}
button:hover {
  opacity: 1;
}
button:disabled {
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  opacity: 0.8;
  transform: scale(1);
}
.error {
  color: crimson;
  font-weight: 700;
  position: absolute;
  transform: translateY(-10px);
}
</style>
