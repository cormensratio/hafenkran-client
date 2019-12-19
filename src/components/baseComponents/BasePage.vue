<template>
  <div class="base-page">
    <Header></Header>
    <div class="page-container">
      <slot name="body"></slot>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
  name: 'BasePage',
  components: { Footer, Header },
};
</script>

<style scoped>
  .base-page {
    height: 100%;
    margin-top: 10px;
  }
  .page-container {
    margin-bottom: 120px;
  }
</style>
