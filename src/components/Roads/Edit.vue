<template>
  <div class="wrapper">
    <div class="container" @submit.prevent=editData>
      <form class="inputFields">
        <h1>Edit your road {{road.username}}</h1>
        <div>
          <label>Start point:</label>
          <input class="startpoint" type="text" v-model="road.startpoint" />
        </div>
        <div>
          <label>Start image:</label>
          <input class="startimage" type="text" v-model="road.startimage" />
        </div>
        <div>
          <label>End point:</label>
          <input class="endpoint" type="text" v-model="road.endpoint" />
        </div>
        <div>
          <label>End image:</label>
          <input class="endimage" type="text" v-model="road.endimage" />
        </div>
        <div>
          <label>Expectations:</label>
          <input class="expectations" type="text" v-model="road.expectations" />
        </div>
        <div>
          <button type=submit>Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { roadService } from "../Services/roadsService";

export default {
  mixins: [roadService],
  data() {
    return {
      docID: this.$route.params.id,
      road: {}
    };
  },
  created() {
    this.getData()
  },
  methods: {
    editData() {
      this.setData()
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: darkslategrey;
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
  margin-right: 100px
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
  /* margin-right: 100px */
}
</style>
