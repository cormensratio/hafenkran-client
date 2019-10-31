<template>
 <div>
   <div class="hafen-header">
     <img src="../../assets/hafenkranlogo.svg" class="logo">
   </div>
 </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
  .hafen-header {
    position: relative;
    height: 100px;
    width: 100px;
    padding-bottom: 5px;
    margin: auto;
    padding-top: 5px;
  }
  .logo {
    height: 100%;
    width: 100%;
    transition: transform .1s;
  }
  .logo:hover{
    animation-name: scaling;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .logo:not(hover) {
    animation-name: leave;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  @keyframes scaling {
    50% {
      transform: scale(3, 3);
    }
    100% {
      transform: scale(2.5, 2.5);
    }
  }
  @keyframes leave {
    0% {
      transform: scale(2.5, 2.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
