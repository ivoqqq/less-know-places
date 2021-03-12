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
import { destinationService } from "../Services/destinationService";
import DetailsButton from "../DetailsButton";
import PopupImage from "../PopupImage";

export default {
  components: {
    DetailsButton,
    PopupImage,
  },
  mixins: [destinationService],
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
    }
  }
};
</script>
<style lang="scss" scoped>
.places-container::before {
  background-image: url("../../assets/DSC_1928.jpg");
  filter: grayscale(40%);
}
h1 {
  padding: 60px 0 20px 0;
}
.quota {
  color: crimson;
  position: absolute
}
.card {
  display: inline-block;
  margin: 0 20px 20px 20px;
  width: 250px;
  background-color: rgba(20, 23, 27, 0.9);
  padding: 5px 0;
  position: relative;
  font-size: 18px;
  border-radius: 4px;

  h3 {
    height: 30px;
  }
  .destination-image {
    transition: ease 0.2s;

    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
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
}
</style>


