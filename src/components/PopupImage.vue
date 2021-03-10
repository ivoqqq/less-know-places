<template>
<div class="modal-form">
  <span class="close-modal" @click="closeModalImage">X</span> 
  <img class="modal-image" :src="imgurl"/>
</div>
</template>

<script>
export default {
    props: {
      imgurl: {
        type: String
      }
    },
    methods: {
      closeModalImage(){
        this.$emit("closeModalImage", false)
      }
    }
}
</script>

<style scoped>
.modal-form {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  right: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.8);
  animation: animatezoom 0.3s;
}
/* Modal Content/Box */
.modal-image {
  border-radius: 10px;
  padding-top: 100px;
  width: 90%;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
/* ------------------------------- */

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.close-modal {
    position: absolute;
    top: 70px;
    right: 5%;
    color: #f1f1f1;
    font-size: 22px;
    font-weight: bold;
    transition: 0.3s;
    opacity: 0.9;
}
.close-modal:hover{
  cursor: pointer;
  opacity: 1;
}
</style>