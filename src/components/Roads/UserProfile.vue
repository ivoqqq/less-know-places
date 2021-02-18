<template>
  <div class="profile-container">
    <h1>Welcome {{ username }}</h1>
    <div class="cards" :key="road.key" v-for="road in roads">
      <div class="card">
        <div class="start">
          <img class="destination-image" :src="road.startimage" alt="No picture" />
          <p class="startpoint">
            <span>Start:</span>
            {{ road.startpoint }}
          </p>
        </div>
        <div class="exp">{{ road.expectations }}</div>
        <div class="btns">
          <button @click="details(road)">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "../Services/authService";
import { roadService } from "../Services/roadsService";
import router from "../../router";

export default {
  mixins: [authService, roadService],
  data() {
    return {
      roads: [],
    };
  },
  created() {
    this.userData();
    this.getQueryDataProfile();
  },
  methods: {
    details(road) {
      router.push({ name: "Details", params: { id: road.docID } });
    },
  }
};
</script>

<style scoped>
.profile-container {
  background-color: rgb(23, 37, 37);
  min-height: 100vh;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  text-align: center;
}
h1 {
  padding: 60px 0 20px 0;
}
.cards {
  display: inline-block;
  padding: 0 20px 20px 20px;
  width: 250px;
}
.card {
  background-color: rgb(25, 30, 35);
  box-shadow: 10px 10px 5px black;
  padding-bottom: 5px;
}
.start,
.btns {
  padding-bottom: 5px;
  padding-top: 5px;
}
.exp {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
button {
  width: 70%;
  height: 30px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
button:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>