<template>
  <div class="places-container container">
    <h1>Places</h1>
    <card v-for="place in places" :key="place.key" :place="place"></card>
  </div>
</template>

<script>
import { destinationService } from "@/services/destinationService";
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  mixins: [destinationService],
  data() {
    return {
      places: [],
    };
  },
  created() {
    this.getQueryData();
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/container";

.places-container::before {
  background-image: url("../assets/DSC_1928.jpg");
  filter: grayscale(40%);
}
h1 {
  padding: 60px 0 20px 0;
}
</style>


