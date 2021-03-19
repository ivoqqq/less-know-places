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
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: "Rubik";
}
.main-container {
  min-width: 350px;
}
</style>