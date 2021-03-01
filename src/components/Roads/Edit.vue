<template>
  <div class="edit-container">
    <div class="cover-container" @submit.prevent="editData">
      <form class="inputFields">
        <h1>Edit your place {{ road.username }}</h1>
        <div>
          <label>Place to visit:</label>
          <div class="error" v-if="$v.road.startpoint.$error">
            <p v-if="!$v.road.startpoint.minLength">
              Minimum length is 3 characters
            </p>
            <p v-if="!$v.road.startpoint.maxLength">
              Maximum length is 30 characters
            </p>
            <p v-if="!$v.road.startpoint.required">
              The field can not be empty
            </p>
          </div>
          <input
            class="startpoint"
            type="text"
            v-model="road.startpoint"
            @blur="$v.road.startpoint.$touch()"
          />
        </div>

        <div class="error" v-if="$v.finishedUploadTask.$error">
          <p v-if="!$v.finishedUploadTask.required">
            You didn't choose any file
          </p>
        </div>
        <div class="change-image">
          <p style="color: white">Change the picture of the place?</p>
          <input
            type="checkbox"
            name="my-input"
            id="yes"
            @click="isChecked = !isChecked"
          />
        </div>

        <div class="image-container" v-if="isChecked">
          <label
            for="input-image"
            class="input-file-label"
            @click="delOldImg(road.startimage)"
            >{{ file }}</label
          >
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

        <div>
          <div class="error" v-if="$v.road.expectations.$error">
            <p v-if="!$v.road.expectations.minLength">
              Minimum length is 6 characters
            </p>
            <p v-if="!$v.road.expectations.maxLength">
              Maximum length is 200 characters
            </p>
            <p v-if="!$v.road.expectations.required">
              The field can not be empty
            </p>
          </div>
          <label>About the place:</label>
          <input
            class="expectations"
            type="text"
            v-model="road.expectations"
            @blur="$v.road.expectations.$touch()"
          />
        </div>
        <div>
          <button type="submit" :disabled="$v.$invalid">Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { roadService } from "../Services/roadsService";
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  mixins: [roadService],
  data() {
    return {
      road: {},
      imageData: null,
      progress: null,
      file: "ADD PICTURE",
      finishedUploadTask: null,
      isChecked: false,
    };
  },
  validations: {
    road: {
      startpoint: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      expectations: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200),
      },
    },
    finishedUploadTask: {
      required: function(){
        return !this.isChecked
      },
      minValue: minValue(1),
    },
  },
  created() {
    this.getData();
  },
  methods: {
    editData() {
      // this.deleteImage()
      this.setData();
    },
    uploadFile(event) {
      this.addFile(event);
    },
    delOldImg(imgUrl) {
      this.deleteImage(imgUrl);
    },
  },
  watch: {
    progress(){
      if(this.progress === 100){
        this.isChecked = false
      }
    }
  }
};
</script>

<style scoped>
.edit-container {
  background-color: darkslategrey;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}

.cover-container {
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: table;
}
h1 {
  color: goldenrod;
  margin-bottom: 20px;
}
.inputFields {
  display: table-cell;
  vertical-align: middle;
}
.inputFields > div:not(:last-child) {
  width: 50%;
  margin: 0 auto;
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
label {
  font-size: 18px;
  color: goldenrod;
  padding-right: 5px;
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
  font-size: 22px;
}
</style>
