<template>
  <div class="roads-container">
    <!-- <div class="loader" v-if="!isLoaded"><p>LOADING...</p></div> -->
    <h1>Roads</h1>
    <div class="cards">
      <div class="card" v-for="road in roads" :key="road.key">
        <h2 class="card-title">{{ road.username }}</h2>
        <div class="start">
          <img
            @load="loaded"
            class="destination-image"
            :src="road.startimage"
            @error="
              $event.target.src =
                'https://bitsofco.de/content/images/2018/12/broken-1.png'
            "
          />
          <p class="startpoint">
            <span>visit: </span>
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
import { roadService } from "../Services/roadsService";
import router from "../../router";

export default {
  mixins: [roadService],
  data() {
    return {
      roads: [],
      isLoaded: false,
      isImgLoaded: false,
    };
  },
  created() {
    this.getQueryData();
    // var isLoaded = image.complete && image.naturalHeight !== 0;
  },
  methods: {
    details(road) {
      router.push({ name: "Details", params: { id: road.docID } });
    },
    loaded(e) {
      console.log(e);
      this.isImgLoaded = true;
    },
  },
  wathc: {
    isImgLoaded() {
      console.log(this.isImgLoaded);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.loader {
  background: black;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  // p {
  //   position: relative;
  //   transform: translateY(50%);
  //   font-size: 100px;
  // }
}
.roads-container {
  background-color: rgb(29, 49, 49);
  min-height: 100vh;
  color: white;
  text-align: center;
  transition: all ease-in-out 0.2s;
  position: relative;
}
.roads-container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* top: 0; left: 0;
  width: 100%; height: 100%; */
  background-image: url("../../assets/city-lights-night-traffic-highway-roads-1609975.jpg");
  filter: grayscale(60%) blur(1px);
}
h1 {
  padding: 60px 0 20px 0;
}
.card {
  display: inline-block;
  margin: 0 20px 20px 20px;
  width: 250px;
  background-color: rgb(20, 23, 27);
  box-shadow: 10px 10px 5px black;
  padding: 5px 0;
  position: relative;
}
.start,
.btns {
  padding-bottom: 5px;
  padding-top: 5px;
}
// .destination-image {
//   width: 200px;
//   height: 130px;
//   object-fit: contain;
// }
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


