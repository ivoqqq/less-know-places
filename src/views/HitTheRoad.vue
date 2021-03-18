<template>
  <div class="places-container container">
    <h1>Places</h1>
    <div class="cards">
      <div class="card" v-for="place in places" :key="place.key">
        <h3 class="card-title">{{ place.username }}</h3>
        <div>
          <img
            class="destination-image"
            @click="openModalImage($event)"
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
    <popup-image
      v-if="show"
      :imgurl="imgurl"
      @closeModalImage="show = $event"
    ></popup-image>
  </div>
</template>

<script>
import { destinationService } from "../services/destinationService";
import DetailsButton from "../components/DetailsButton";
import PopupImage from "../components/PopupImage";

export default {
  components: {
    DetailsButton,
    PopupImage,
  },
  mixins: [ destinationService ],
  data() {
    return {
      places: [],
      show: false,
      imgurl: "",
    };
  },
  created() {
    this.getQueryData();
  },
  methods: {
    openModalImage(e) {
      this.imgurl = e.target.src;
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/container";
@import "@/styles/card";
@import "@/styles/image-thumb";

.places-container::before {
  background-image: url("../assets/DSC_1928.jpg");
  filter: grayscale(40%);
}
h1 {
  padding: 60px 0 20px 0;
}
</style>


