<template>
  <div class="wrapper">
    <h1>HOME PAGE</h1>
    <div class="info">In this page logged users can upload their future journeys and what they expect to see or learn..</div>
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
.wrapper {
  background-image: url("../../assets/Forest Road-4096x2731.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-attachment: fixed; sets whether a background image scrolls with the rest of the page, or is fixed. */
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
