<template>
  <div class="create-container">
    <div class="cover-container">
      <form class="inputFields" @submit.prevent="addData">
        <h1>Create your road {{username}}</h1>

        <div class="error" v-if="$v.road.startpoint.$error">
          <p v-if="!$v.road.startpoint.minLength">Minimum length is 3 characters</p>
          <p v-if="!$v.road.startpoint.maxLength">Maximum length is 15 characters</p>
          <p v-if="!$v.road.startpoint.required">Please fill in starting point</p>
        </div>
        <input
          class="startpoint"
          type="text"
          placeholder="type in your startpoint..."
          v-model="road.startpoint"
          @blur="$v.road.startpoint.$touch()"
        />

        <div class="error" v-if="$v.road.startimage.$error">
          <p v-if="!$v.road.startimage.required">Place image url</p>
        </div>
        <input
          class="startimage"
          type="text"
          placeholder="place startimage URL..."
          v-model="road.startimage"
          @blur="$v.road.startimage.$touch()"
        />

        <div class="error" v-if="$v.road.endpoint.$error">
          <p v-if="!$v.road.endpoint.minLength">Minimum length is 3 characters</p>
          <p v-if="!$v.road.endpoint.maxLength">Maximum length is 15 characters</p>
          <p v-if="!$v.road.endpoint.required">Please fill in ending point</p>
        </div>
        <input
          class="endpoint"
          type="text"
          placeholder="type in your endpoint..."
          v-model="road.endpoint"
          @blur="$v.road.endpoint.$touch()"
        />

        <div class="error" v-if="$v.road.endimage.$error">
          <p v-if="!$v.road.endimage.required">Place image url</p>
        </div>
        <input
          class="endimage"
          type="text"
          placeholder="place endimage URL..."
          v-model="road.endimage"
          @blur="$v.road.endimage.$touch()"
        />

        <div class="error" v-if="$v.road.expectations.$error">
          <p v-if="!$v.road.expectations.minLength">Minimum length is 6 characters</p>
          <p v-if="!$v.road.expectations.maxLength">Maximum length is 150 characters</p>
          <p v-if="!$v.road.expectations.required">Please write your expectations</p>
        </div>
        <input
          class="expectations"
          type="text"
          placeholder="expectations"
          v-model="road.expectations"
          @blur="$v.road.expectations.$touch()"
        />
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

export default {
  mixins: [roadService, authService],
  data() {
    return {
      road: {}
    };
  },
  validations: {
    road: {
      startpoint: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      },
      endpoint: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      },
      expectations: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200)
      },
      startimage: {
        required
      },
      endimage: {
        required
      }
    }
  },
  created() {
    this.userData();
  },
  methods: {
    addData() {
      this.createData();
    }
  }
};
</script>

<style scoped>
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
