<template>
  <div class="edit-container">
    <form class="input-form" @submit.prevent="editData">
      <h1>Edit your place {{ place.username }}</h1>
      <div>
        <label>Place to visit:</label>
        <div class="error" v-if="$v.place.title.$error">
          <p v-if="!$v.place.title.minLength">
            At least 3 characters
          </p>
          <p v-if="!$v.place.title.maxLength">
            Maximum 30 characters
          </p>
          <p v-if="!$v.place.title.required">No empty fields</p>
        </div>
        <input
          type="text"
          v-model="place.title"
          @blur="$v.place.title.$touch()"
        />
      </div>

      <div class="error" v-if="$v.finishedUploadTask.$error">
        <p v-if="!$v.finishedUploadTask.required">You didn't choose any file</p>
      </div>
      <div class="change-image">
        <p>Change image?</p>
        <div class="change-image-checkbox">
          <input
            type="checkbox"
            name="my-input"
            id="yes"
            @click="isChecked = !isChecked"
          />
        </div>

        <div class="input-image-container" v-if="isChecked">
          <label for="input-image" class="input-file-label">{{ file }}</label>
          <input
            id="input-image"
            ref="upload"
            accept="image/*"
            type="file"
            @change="uploadFile(place.photo)"
            @blur="$v.finishedUploadTask.$touch()"
          />
        </div>
      </div>
      <progress
        v-if="progress != null"
        class="progress-bar"
        :value="progress"
        max="100"
      ></progress>

      <div>
        <label>About the place:</label>
        <div class="error" v-if="$v.place.description.$error">
          <p v-if="!$v.place.description.minLength">
            At least 6 characters
          </p>
          <p v-if="!$v.place.description.maxLength">
            Maximum 200 characters
          </p>
          <p v-if="!$v.place.description.required">
            No empty fields
          </p>
        </div>
        <input
          class="description"
          type="text"
          v-model="place.description"
          @blur="$v.place.description.$touch()"
        />
      </div>
      <button class="button" type="submit" :disabled="$v.$invalid">Edit</button>
    </form>
  </div>
</template>

<script>
import { destinationService } from "../Services/destinationService";
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  mixins: [destinationService],
  data() {
    return {
      place: {},
      imageData: null,
      progress: null,
      file: "ADD PICTURE",
      finishedUploadTask: null,
      isChecked: false,
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
      required: function () {
        return !this.isChecked;
      },
      minValue: minValue(1),
    },
  },
  created() {
    this.getData();
  },
  methods: {
    editData() {
      this.setData();
    },
    uploadFile(oldImgUrl) {
      this.deleteImage(oldImgUrl);
      this.addFile(event);
    },
  },
  watch: {
    progress() {
      if (this.progress === 100) {
        this.isChecked = false;
      }
    },
  },
};
</script>

<style scoped>
.change-image {
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.change-image p {
  color: goldenrod;
  margin: 5px 0 22px 0;
  width: 100px;
}
.change-image-checkbox {
  display: flex;
}
input[type="checkbox"] {
  width: 30px;
  margin: 5px 10px 22px 10px;
}

.edit-container {
  min-height: 100vh;
  min-width: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: darkslategrey;
  filter: grayscale(50%) brightness(60%);
  z-index: -1;
}

h1 {
  color: white;
  margin-bottom: 20px;
}
.input-form {
  text-align: center;
  position: relative;
  width: 80%;
  padding: 80px 40px 40px 40px;
}
.input-form > div:not(:last-child) {
  width: 50%;
  margin: 0 auto;
}
@media screen and (max-width: 650px){
  .input-form > div:not(:last-child), .button {
    width: 70%;
  }
}
@media screen and (max-width: 400px){
  .input-form > div:not(:last-child), .button {
    width: 70%;
  }
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
label {
  font-size: 18px;
  color: goldenrod;
}
button {
  width: 50%;
  height: 40px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 22px;
  transition: all 0.1s ease-in-out;
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
  font-weight: 600;
  position: absolute;
  transform: translateY(-10px);
}
</style>
