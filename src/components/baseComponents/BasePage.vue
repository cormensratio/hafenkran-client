<template>
  <div class="base-page">
    <Header></Header>
    <div class="page-container">
      <slot name="body"></slot>
    </div>
    <v-snackbar v-model="snackShow" :color="color" :timeout="0" right>
      {{ snack }}
      <v-btn v-if="color === 'green' || color === 'error'"
             flat color="white" @click=showSnack(false)>Close
      </v-btn>
      <v-btn v-else flat color="info" @click=showSnack(false)>Close</v-btn>
    </v-snackbar>
    <Footer class="hafen-footer"></Footer>
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
    ...mapGetters(['snackShow', 'snack', 'color']),
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
  @media only screen and (max-height: 600px){
    .hafen-footer{
      display: none;
    }
  }
  .page-container {
    overflow: auto;
    height: 83%;
  }
</style>
