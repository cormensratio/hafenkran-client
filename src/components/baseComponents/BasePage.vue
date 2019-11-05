<template>
  <div>
    <Header></Header>
    <slot name="body"></slot>
  </div>
</template>

<script>
import Header from './Header';

export default {
  name: 'BasePage',
  components: { Header },
};
</script>

<style scoped>
</style>
