<template>
  <div class="profile-container container">
    <h1>Your places</h1>
    <div class="cards">
      <div class="card" v-for="place in places" :key="place.key">
        <h2 class="card-title"></h2>
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
            <span>visit:</span>
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
import { authService } from "../services/authService";
import { destinationService } from "../services/destinationService";
import DetailsButton from "../components/DetailsButton";
import PopupImage from "../components/PopupImage";

export default {
  components: {
    DetailsButton,
    PopupImage,
  },
  mixins: [ authService, destinationService ],
  data() {
    return {
      places: [],
      show: false,
      imgurl: "",
    };
  },
  created() {
    this.getQueryDataProfile();
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
.profile-container::before {
  background-image: url("../assets/DSC-0774.jpg");
  filter: grayscale(40%) brightness(60%);
}
h1 {
  padding: 60px 0 20px 0;
  position: relative;
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

  h2 {
    height: 30px;
  }
  .destination-image {
    transition: ease 0.2s;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
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