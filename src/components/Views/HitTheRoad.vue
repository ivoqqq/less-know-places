<template>
  <div class="places-container container">
    <h1>Roads</h1>
    <div class="cards">
      <div class="card" v-for="place in places" :key="place.key">
        <h2 class="card-title">{{ place.username }}</h2>
        <div>
          <img
            @load="loaded"
            class="destination-image"
            :src="place.photo"
            @error="
              $event.target.src =
                'https://bitsofco.de/content/images/2018/12/broken-1.png'
            "
          />
          <p class="title">
            <span>visit: </span>
            {{ place.title }}
          </p>
        </div>
        <div class="description">{{ place.description }}</div>
        <div class="btns">
          <details-button :place="place"></details-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { destinationService } from "../Services/destinationService";
import DetailsButton from "../DetailsButton";

export default {
  components: {
    DetailsButton,
  },
  mixins: [destinationService],
  data() {
    return {
      places: [],
      isImgLoaded: false,
    };
  },
  created() {
    this.getQueryData();
  },
  methods: {
    loaded() {
      this.isImgLoaded = true;
    },
  },
};
</script>
<style scoped>
.places-container::before {
  background-image: url("../../assets/city-lights-night-traffic-highway-roads-1609975.jpg");
  filter: grayscale(60%) blur(1px);
}
h1 {
  padding: 60px 0 20px 0;
}
h2 {
  height: 30px;
}
.card {
  display: inline-block;
  margin: 0 20px 20px 20px;
  width: 250px;
  background-color: rgb(20, 23, 27);
  box-shadow: 10px 10px 5px black;
  padding: 5px 0;
  position: relative;
  font-size: 18px;
}
.btns {
  padding: 5px 0;
}
.description,
.title {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
span {
  color: goldenrod;
}
</style>


