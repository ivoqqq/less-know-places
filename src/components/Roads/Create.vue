<template>
  <div class="create-container">
    <div class="cover-container">
      <form class="inputFields" @submit.prevent="addData">
        <!-- <h1>Create your road {{ username }}</h1> -->

        <div class="error" v-if="$v.road.startpoint.$error">
          <p v-if="!$v.road.startpoint.minLength">
            Minimum length is 3 characters
          </p>
          <p v-if="!$v.road.startpoint.maxLength">
            Maximum length is 15 characters
          </p>
          <p v-if="!$v.road.startpoint.required">
            Please fill in starting point
          </p>
        </div>
        <input
          class="startpoint"
          type="text"
          v-model="road.startpoint"
          placeholder="type in your startpoint..."
          @blur="$v.road.startpoint.$touch()"
        />
        <!-- <div class="error" v-if="$v.road.startimage.$error">
          <p v-if="!$v.road.startimage.required">Place image url</p>
        </div> -->
        <!-- <input
          class="startimage"
          type="text"
          placeholder="place startimage URL..."
          v-model="road.startimage"
          @blur="$v.road.startimage.$touch()"
        /> -->

        <div class="error" v-if="$v.road.expectations.$error">
          <p v-if="!$v.road.expectations.minLength">
            Minimum length is 6 characters
          </p>
          <p v-if="!$v.road.expectations.maxLength">
            Maximum length is 150 characters
          </p>
          <p v-if="!$v.road.expectations.required">
            Please write your expectations
          </p>
        </div>
        <input
          class="expectations"
          type="text"
          placeholder="expectations"
          v-model="road.expectations"
          @blur="$v.road.expectations.$touch()"
        />
        <div class="input-destination-image">
          <label for="input-image" class="input-destination-label">{{
            file
          }}</label>
          <input
            id="input-image"
            ref="upload"
            @change="onUpload"
            accept="image/*"
            type="file"
          />
          <progress class="progress-bar" :value="progress" max="100"></progress>
        </div>
        <div>
          <button :disabled="$v.$invalid">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { roadService } from "../Services/roadsService";
import { authService } from "../Services/authService";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  mixins: [roadService, authService],
  data() {
    return {
      road: {},
      imgURL: "",
      imageData: null,
      progress: null,
      file: "BROWSE FILE",
    };
  },
  validations: {
    road: {
      startpoint: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
      },
      expectations: {
        // required,
        minLength: minLength(6),
        maxLength: maxLength(200),
      },
      // startimage: {
      //   required
      // },
    },
  },
  created() {
    this.userData();
  },
  methods: {
    addData() {
      this.createData();
    },
    onUpload(event) {
      this.progress = 0;
      this.imageData = event.target.files[0];

      function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }
      var file = new File([this.imageData], uuidv4() + ".jpg", {
        type: "image/jpeg",
      });
      //copmatable chrome; edge: 01.2020...; IE: no;
      //formData.append() is older => more compatable

      const storageRef = firebase.storage().ref(`${file.name}`).put(file); //expected Blob or File
      console.log(storageRef)

      storageRef.on(
        `state_changed`,
        (snapshot) => {
          //the task of uploading
          this.file = "UPLOADING...";
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.road.startimage = url;
            this.file = "FILE UPLOADED";
          });
        }
      );
    },
  },
};
</script>

<style scoped>
input:focus {
  opacity: 0.2;
}
input[type="file"] {
  display: none;
}
.input-destination-label {
  display: inline-block;
  width: 175px;
  height: 30px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
.input-destination-label:hover {
  opacity: 1;
  transform: scale(1.1);
}
.create-container {
  background-image: url("../../assets/ro-road_332.jpg");
  background-color: rgba(0, 0, 0, 0.7);
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
  color: gold;
}
.inputFields {
  display: table-cell;
  vertical-align: middle;
}
input {
  outline: none;
  color: white;
  width: 50%;
  margin: 5px 0 22px 0;
  display: inline-block;
  height: 30px;
  background: transparent;
  border-color: transparent;
  border-bottom: 2px solid yellowgreen;
  font-size: 16px;
}
::placeholder {
  color: gold;
  opacity: 0.8;
  font-size: 14px;
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
  transform: scale(1.1);
}
button:disabled {
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  opacity: 0.8;
  transform: scale(1);
}
.error {
  color: red;
  font-weight: 700;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
