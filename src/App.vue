<template>
  <div id="app">
    <header class="header">
      <navigation-bar></navigation-bar>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 300;
}
</style>