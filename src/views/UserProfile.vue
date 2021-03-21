<template>
  <div class="profile-container container">
    <h1>Your places</h1>
    <card v-for="place in places" :key="place.key" :place="place"></card>
  </div>
</template>

<script>
import { destinationService } from "@/services/destinationService";
import Card from "@/components/Card";

export default {
  components: {
    Card,
  },
  mixins: [destinationService],
  data() {
    return {
      places: [],
    };
  },
  created() {
    this.getQueryDataProfile();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/container";

.profile-container::before {
  background-image: url("../assets/DSC-0774.jpg");
  filter: grayscale(40%) brightness(60%);
}
h1 {
  padding: 60px 0 20px 0;
  position: relative;
}
</style>