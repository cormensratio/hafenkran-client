<template>
  <div>
    <div class="hafen-header">
      <img src="../../assets/hafenkranlogo.svg" class="logo">
    </div>
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  name: 'BasePage',
};
</script>

<style scoped>
.hafen-header {
  top: 0;
  left: 0;
  position: fixed;
  height: 10%;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 10px;
  padding-top: 5px;
}
.logo {
  height: 100%;
  width: 100%;
}
</style>
