<template>
 <div>
   <div class="hafen-header">
     <a href="/"><img src="../../assets/hafenkranlogo.svg" class="logo"></a>
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
    height: 130px;
    width: 130px;
    margin: auto;
  }
  .logo {
    height: 100%;
    width: 100%;
    margin: auto;
    animation-name: shrink;
    animation-duration: 1s;
  }
  .logo:hover{
    animation-name: scaling;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .logo:not(hover) {
    animation-name: leave;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  @keyframes scaling {
    50% {
      transform: scale(1.75, 1.75);
    }
    100% {
      transform: scale(1.5, 1.5);
    }
  }
  @keyframes leave {
    0% {
      transform: scale(1.5, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
