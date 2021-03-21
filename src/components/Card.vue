<template>
  <div class="card">
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
    <popup-image
      v-if="showFullImage"
      :imgurl="imgurl"
      @closeModalImage="showFullImage = $event"
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
      showFullImage: false,
      imgurl: "",
    };
  },
  methods: {
    openModalImage(e) {
      this.imgurl = e.target.src;
      this.showFullImage = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/card";
@import "@/styles/image-thumb";
</style>