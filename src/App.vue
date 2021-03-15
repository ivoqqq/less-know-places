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
  background-color: rgb(0, 11, 20);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.destination-image {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
input,
textarea {
  font-family: "Rubik";
  font-size: 16px;
  outline: none;
  color: white;
  width: 100%;
  margin: 5px 0 22px 0;
  display: inline-block;
  height: 30px;
  background: transparent;
  border-color: transparent;
  border-bottom: 2px solid rgba(153, 205, 50, 0.5);
  opacity: 0.8;

  &::placeholder {
    color: goldenrod;
  }

  &:focus {
    opacity: 1;
  }
}
textarea {
  height: 100px;
  resize: none;
}
.error {
  font-family: monospace;
}
</style>