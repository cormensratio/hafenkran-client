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
import StartPage from '../views/StartPage';

export default {
  name: 'BasePage',
  components: { StartPage, Footer, Header },
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
