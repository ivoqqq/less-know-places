<template>
  <div class="roads-container">
    <h1>Roads</h1>
    <div class="cards" :key="road.key" v-for="road in roads">
      <div class="card">
        <h2 class="card-title">{{ road.username }}</h2>
        <div class="start">
          <img class="card-img-top" :src="road.startimage" alt="No picture" />
          <p class="startpoint">
            <span>Start: </span>
            {{ road.startpoint }}
          </p>
        </div>
        <div class="end">
          <img class="card-img-top" :src="road.endimage" alt="No picture" />
          <p class="endpoint">
            <span>End: </span>
            {{ road.endpoint }}
          </p>
        </div>
        <div class="exp">{{ road.expectations }}</div>
        <!-- <div class="exp">{{road.expectations | textShown}}...</div> с 4 реда css -->
        <div class="btns">
          <button @click="details(road)">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roadService } from "../Services/roadsService";
import router from "../../router";

export default {
  mixins: [roadService],
  data() {
    return {
      roads: [],
    };
  },
  created() {
    this.getQueryData();
  },
  methods: {
    details(road) {
      router.push({ name: "Details", params: { id: road.docID } });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.roads-container {
  background-image: url("../../assets/city-lights-night-traffic-highway-roads-1609975.jpg");
  background-color: rgb(29, 49, 49);
  height: 100vh;
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
.end,
.btns {
  padding-bottom: 5px;
  padding-top: 5px;
}
img {
  width: 200px;
  height: 130px;
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
span {
  color: gold;
}
</style>