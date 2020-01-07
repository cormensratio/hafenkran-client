<template>
  <div class="base-page">
    <Header></Header>
    <div class="page-container">
      <slot name="body"></slot>
    </div>
    <v-snackbar v-model="snackShow" right>
      {{ snack }}
      <v-btn flat color="accent" @click=showSnack(false)>Close</v-btn>
    </v-snackbar>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Header from './Header';
import Footer from './Footer';
import StartPage from '../views/StartPage';

export default {
  name: 'BasePage',
  components: { StartPage, Footer, Header },
  computed: {
    ...mapGetters(['snackShow', 'snack']),
  },
  methods: {
    ...mapMutations(['showSnack']),
  },
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
