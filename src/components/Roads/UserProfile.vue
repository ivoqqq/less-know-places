<template>
  <div class="profile-container">
    <h1>Your places</h1>
    <div class="cards">
      <div class="card" v-for="road in roads" :key="road.key">
        <h2 class="card-title"></h2>
        <div class="start">
          <img
            class="destination-image"
            :src="road.startimage"
            @error="
              $event.target.src =
                'https://bitsofco.de/content/images/2018/12/broken-1.png'
            "
          />
          <p class="startpoint">
            <span>visit:</span>
            {{ road.startpoint }}
          </p>
        </div>
        <div class="exp">{{ road.expectations }}</div>
        <div class="btns">
          <details-button :road="road"></details-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "../Services/authService";
import { roadService } from "../Services/roadsService";
import DetailsButton from "../DetailsButton";

export default {
  components: {
    DetailsButton,
  },
  mixins: [authService, roadService],
  data() {
    return {
      roads: [],
    };
  },
  created() {
    this.currentUserName();
    this.getQueryDataProfile();
  },
};
</script>

<style scoped>
.profile-container {
  background-color: rgb(29, 49, 49);
  min-height: 100vh;
  color: white;
  text-align: center;
  position: relative;
}
.profile-container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/DSC-0774.jpg");
  filter: grayscale(50%) brightness(60%);
}
h1 {
  padding: 60px 0 20px 0;
  position: relative;
}
h2 {
  height: 30px;
}
.card {
  display: inline-block;
  margin: 0 20px 20px 20px;
  width: 250px;
  background-color: rgb(20, 23, 27);
  box-shadow: 10px 10px 5px black;
  padding: 5px 0;
  position: relative;
  font-size: 18px;
}
.btns {
  padding-bottom: 5px;
  padding-top: 5px;
}
.exp, .startpoint {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
span {
  color: goldenrod;
}
</style>