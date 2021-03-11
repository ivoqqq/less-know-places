<template>
  <div class="modal-form">
    <span class="close-modal" @click="closeModalImage">×</span>
    <img class="modal-image" :src="imgurl" />
  </div>
</template>

<script>
export default {
  props: {
    imgurl: {
      type: String,
    },
  },
  methods: {
    closeModalImage() {
      this.$emit("closeModalImage", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-form {
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  animation: animatezoom 0.3s;

  .modal-image {
    border-radius: 10px;
    margin-top: 100px;
    width: 90%;
  }

  .close-modal {
    position: absolute;
    top: 55px;
    right: 5%;
    color: #f1f1f1;
    font-size: 32px;
    font-weight: bold;
    transition: 0.3s;
    opacity: 0.9;
    font-family: Verdana, sans-serif;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>