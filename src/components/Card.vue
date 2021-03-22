<template>
  <div class="card">
    <h3 class="card-title">{{ place.username }}</h3>
    <v-img
      contain
      class="destination-image"
      @click="openModalImage(place.photo)"
      :src="place.photo"
      @error="
        $event.target.src =
          'https://bitsofco.de/content/images/2018/12/broken-1.png'
      "
    ></v-img>
    <p class="title">
      <span>visit: </span>
      {{ place.title }}
    </p>
    <div class="description">{{ place.description }}</div>
    <div class="btns">
      <details-button :place="place"></details-button>
    </div>
    <popup-image
      v-if="showModalImage"
      :imgurl="imgurl"
      @closeModalImage="showModalImage = $event"
    ></popup-image>
  </div>
</template>

<script>
import DetailsButton from "./DetailsButton";
import PopupImage from "./PopupImage";
export default {
  components: {
    DetailsButton,
    PopupImage,
  },
  props: {
    place: {
      type: Object,
    },
  },
  data() {
    return {
      showModalImage: false,
      imgurl: "",
    };
  },
  methods: {
    openModalImage(url) {
      this.imgurl = url;
      this.showModalImage = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/card";
@import "@/styles/destination-image";
</style>