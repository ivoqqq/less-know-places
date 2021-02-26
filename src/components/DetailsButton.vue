<template>
  <button @click="details(road)">Details</button>
</template>

<script>
import router from "../router";
export default {
  props: {
      road: {
          type: Object
      }
  },
  methods: {
    details(road) {
      router.push({ name: "Details", params: { id: road.docID } });
    },
  },
};
</script>

<style scoped>
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
  border-radius: 2px;
}
button:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>
