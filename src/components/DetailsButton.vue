<template>
  <button @click="details(place)">Details</button>
</template>
<script>
import router from "../router/router";

export default {
  props: {
    place: {
      type: Object,
    },
  },
  methods: {
    details(place) {
      router.push({ name: "Details", params: { id: place.docID } });
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 70%;
  height: 30px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 16px;
  transition: all 0.1s ease-in-out;
  border-radius: 2px;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &:disabled {
    background-color: rgb(204, 204, 204);
    color: rgb(102, 102, 102);
    opacity: 0.8;
    transform: scale(1);
  }
}
</style>
