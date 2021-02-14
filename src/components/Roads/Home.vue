<template>
  <div class="home-container">
    <!-- <h1>HOME PAGE</h1> -->
    <!-- <div class="info">In this page logged users can upload their future journeys and what they expect to see or learn..</div> -->
  </div>
</template>

<script>


export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-container {
  background-image: url("../../assets/Forest Road-4096x2731.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  text-align: center;
}
h1 {
  padding-top: 60px;
}
.info {
  padding-top: 100px;
  font-size: 22px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
