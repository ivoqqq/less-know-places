<template>
  <div class="edit-container">
    <div class="cover-container" @submit.prevent="editData">
      <form class="inputFields">
        <h1>Edit your road {{road.username}}</h1>
        <div>
          <label>Start point:</label>
          <div class="error" v-if="$v.road.startpoint.$error">
            <p v-if="!$v.road.startpoint.minLength">Minimum length is 3 characters</p>
            <p v-if="!$v.road.startpoint.maxLength">Maximum length is 15 characters</p>
            <p v-if="!$v.road.startpoint.required">Please fill in starting point</p>
          </div>
          <input
            class="startpoint"
            type="text"
            v-model="road.startpoint"
            @blur="$v.road.startpoint.$touch()"
          />
        </div>

        <div class="error" v-if="$v.road.startimage.$error">
          <p v-if="!$v.road.startimage.required">Place image url</p>
        </div>
        <div>
          <label>Start image:</label>
          <input
            class="startimage"
            type="text"
            v-model="road.startimage"
            @blur="$v.road.startimage.$touch()"
          />
        </div>

        <div>
          <div class="error" v-if="$v.road.expectations.$error">
            <p v-if="!$v.road.expectations.minLength">Minimum length is 6 characters</p>
            <p v-if="!$v.road.expectations.maxLength">Maximum length is 150 characters</p>
            <p v-if="!$v.road.expectations.required">Please write your expectations</p>
          </div>
          <label>Expectations:</label>
          <input class="expectations" type="text" v-model="road.expectations" @blur="$v.road.expectations.$touch()"/>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [roadService],
  data() {
    return {
      docID: this.$route.params.id,
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
      expectations: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200)
      },
      startimage: {
        required
      },
    }
  },
  created() {
    this.getData();
  },
  methods: {
    editData() {
      this.setData();
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
  color: gold;
  margin-bottom: 20px;
}
.inputFields {
  display: table-cell;
  vertical-align: middle;
}
.inputFields > div:not(:last-child){
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
  border-bottom: 1px solid yellowgreen;
  font-size: 16px;
  /* margin-right: 100px; */
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
label {
  font-size: 18px;
  color: gold;
  padding-right: 5px;
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
