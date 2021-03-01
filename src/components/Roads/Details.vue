<template>
  <div class="details-container">
    <h1>Details</h1>
    <div class="cards">
      <div class="card">
        <h2 class="card-title">{{ road.username }}</h2>
        <div class="start">
          <img
            class="destination-image"
            :src="road.startimage"
            @error="
              $event.target.src =
                'https://bitsofco.de/content/images/2018/12/broken-1.png'
            "
          />
          <p class="startpoint">
            <span>visit:</span>
            {{ road.startpoint }}
          </p>
        </div>
        <div class="btns">
          <button @click.stop="editData(docID)" :disabled="!disableButton">
            Edit
          </button>
          <button @click.stop="deleteData(docID, road.startimage)" :disabled="!disableButton">
            Delete
          </button>
        </div>
      </div>
      <div class="exp">{{ road.expectations }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../../router";
import { roadService } from "../Services/roadsService";

export default {
  mixins: [roadService],
  data() {
    return {
      road: {},
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
  },
  computed: {
    disableButton: function () {
      return this.road.id === firebase.auth().currentUser.uid;
    },
  }
};
</script>

<style scoped>
.details-container {
  min-height: 100vh;
  color: white;
  text-align: center;
  position: relative;
}
.details-container::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/red-nature-70254.jpg");
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
}
.startpoint {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.exp {
  background-color: rgba(20, 23, 27, 0.9);
  display: inline-block;
  width: 190px;
  height: 336px;
  text-align: justify;
  vertical-align: top;
  padding: 30px;
  font-size: 18px;
  position: relative;
  border-radius: 0 4px 4px 0;
}
.btns {
  padding: 5px 0;
}
button {
  width: 35%;
  height: 30px;
  background-color: olive;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
button:hover {
  opacity: 1;
  transform: scale(1.1);
}
button:disabled {
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  opacity: 0.8;
  transform: scale(1);
}
span {
  color: goldenrod;
}
</style>

