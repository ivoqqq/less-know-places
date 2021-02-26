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
          <button @click.stop="deleteData(docID)" :disabled="!disableButton">
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
    deleteData(id, data) {
      this.delData(id, data);
    },
    editData(id) {
      router.push({ name: "Edit", params: { id: id } });
    },
  },
  computed: {
    disableButton: function () {
      return this.road.id === firebase.auth().currentUser.uid;
    },
  },
};
</script>

<style scoped>
.details-container {
  background-color: rgb(23, 37, 37);
  height: 100vh;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: white;
}
h1 {
  padding: 60px 0 20px 0;
}
.card {
  padding: 5px 0;
  width: 250px;
  height: 386px;
  background-color: rgb(20, 23, 27);
  display: inline-block;
  box-shadow: 10px 10px 5px black;
  font-size: 18px;
}
.startpoint {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.exp {
  background-color: rgb(20, 23, 27);
  display: inline-block;
  width: 190px;
  height: 336px;
  text-align: justify;
  vertical-align: top;
  padding: 30px;
  box-shadow: 10px 10px 5px black;
  font-size: 18px;
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

