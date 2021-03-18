<template>
  <div class="home-container container">
    <div class="greeting">
      <h1>Hello, traveler!</h1>
      <br />
      <p>
        If you want to see and visit interesting and beautiful, but not so
        famous places in Bulgaria you can start by logging in.
      </p>
      <p>You can also share views with us.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/container";

.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-container::before {
  background-image: url("../assets/Forest Road-4096x2731.jpg");
  z-index: -1;
}
h1 {
  width: 100%;
}
.greeting {
  font-size: 22px;
  text-align: left;
  width: 60%;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(20, 23, 27, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    z-index: -1;
  }

  p {
    margin-bottom: 10px;
    font-weight: 500;
    font-style: italic;
  }
}
</style>
