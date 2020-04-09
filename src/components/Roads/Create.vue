<template>
  <div class="wrapper">
    <div class="container">
      <form class="inputFields" @submit.prevent="addData">
        <h1>Create your road {{username}}</h1>
        <input
          class="startpoint"
          type="text"
          placeholder="type in your startpoint..."
          v-model="road.startpoint"
        />
        <input
          class="startimage"
          type="text"
          placeholder="place startimage URL..."
          v-model="road.startimage"
        />
        <input
          class="endpoint"
          type="text"
          placeholder="type in your endpoint..."
          v-model="road.endpoint"
        />
        <input
          class="endimage"
          type="text"
          placeholder="place endimage URL..."
          v-model="road.endimage"
        />
        <input
          class="expectations"
          type="text"
          placeholder="expectations"
          v-model="road.expectations"
        />
        <div>
          <button>Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { roadService } from "../Services/roadsService";
import { authService } from "../Services/authService";

export default {
  mixins: [roadService, authService],
  data() {
    return {
      road: {}
    };
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
.wrapper {
  background-image: url("../../assets/ro-road_332.jpg");
  /* background-color: darkslategrey; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
h1 {
  color: gold;
}
.container {
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  display: table;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 5px black;
}
.inputFields {
  /* border: 2px solid greenyellow; */
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
  border-bottom: 1px solid yellowgreen;
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
</style>
