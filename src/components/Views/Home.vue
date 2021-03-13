<template>
  <div class="home-container">
    <h1>Hello!</h1>
    <h2>
      If you want to see and visit interesting and beautiful, but not so famous places in Bulgaria you can start by loggin in :). 
      If you want, you can also share views with us.
    </h2>
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
h1, h2 {
  width: 40%;
  padding-top: 60px;
}
</style>
