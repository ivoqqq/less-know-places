<template>
  <div class="details-container container">
    <h1>Details</h1>
    <div class="cards">
      <div class="card">
        <h2 class="card-title">{{ place.username }}</h2>
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
        <div class="btns">
          <button @click.stop="editData(docID)" :disabled="!disableButton">
            Edit
          </button>
          <button
            @click.stop="deleteData(docID, place.photo)"
            :disabled="!disableButton"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="description">{{ place.description }}</div>
      <popup-image
        v-if="show"
        :imgurl="imgurl"
        @closeModalImage="show = $event"
      ></popup-image>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../router/router";
import { destinationService } from "../services/destinationService";
import PopupImage from "../components/PopupImage";

export default {
  components: {
    PopupImage,
  },
  mixins: [ destinationService ],
  data() {
    return {
      place: {},
      show: false,
      imgurl: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    deleteData(id, imgUrl) {
      this.delData(id, imgUrl);
    },
    editData(id) {
      router.push({ name: "Edit", params: { id: id } });
    },
    openModalImage(e) {
      this.imgurl = e.target.src;
      this.show = true;
    },
  },
  computed: {
    disableButton: function () {
      return this.place.userID === firebase.auth().currentUser.uid;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/container";

.details-container::before {
  background-image: url("../assets/red-nature-70254.jpg");
  filter: grayscale(40%);
}
h1 {
  padding: 60px 0 20px 0;
}
.card {
  padding: 5px 0;
  width: 250px;
  height: 386px;
  background-color: rgba(20, 23, 27, 0.9);
  display: inline-block;
  position: relative;
  font-size: 18px;
  border-radius: 4px 0 0 4px;

  .title {
    display: inline-block;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      color: goldenrod;
    }
  }

  .destination-image {
    transition: ease 0.2s;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
}
.description {
  background-color: rgba(20, 23, 27, 0.9);
  display: inline-block;
  width: 190px;
  // height: 366px;
  text-align: left;
  word-wrap: break-word;
  vertical-align: top;
  padding: 15px 30px;
  font-size: 18px;
  line-height: 1.3;
  position: relative;
  border-radius: 0 4px 4px 0;
}
@media screen and (min-width: 500px){
  .description {
    height: 366px;
  }
}
@media screen and (max-width: 499px) {
  .card {
    height: 250px;
    border-radius: 4px 4px 0 0;
  }
  .description {
    border-radius: 0 0 4px 4px;
    margin-bottom: 10px;
  }
}

.btns {
  padding: 5px 0;

  button {
    width: 35%;
    height: 30px;
    background-color: olive;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    font-size: 16px;
    transition: all 0.1s ease-in-out;

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
  :nth-child(1){
    border-radius: 2px 0 0 2px;
  }
  :nth-child(2){
    border-radius: 0px 2px 2px 0;
  }
}
</style>

