<template>
  <div id="app">
    <header>
      <navigation-bar></navigation-bar>
    </header>
    <main class="main-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}
.main-container {
  min-width: 350px;
}
.container {
  min-height: 100vh;
  position: relative;
  text-align: center;
  color: white;
}
.container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.destination-image {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
</style>