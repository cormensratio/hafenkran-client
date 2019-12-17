<template>
  <div class="base" style="margin-top: 10px; height: 100%">
    <Header></Header>
      <div class="start-page">
        <div style="">
        <v-card
          class="content"
          max-width="700"
          color="rgb(100, 100, 100, 0.6)"
        >
          <v-card-text>
            <p class="display-1 text--primary">
              Welcome to HAFENKRAN
            </p>
            <div class="text--primary">
              For quick and easy deployment:
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              style="background-color:  var(--themeColor)"
              dark
            >
              Sign Up Now
            </v-btn>
          </v-card-actions>
        </v-card>
        </div>
      </div>
    <Footer class="footer-shadow"></Footer>
  </div>
</template>

<script>
import Header from '../baseComponents/Header';
import Footer from '../baseComponents/Footer';

export default {
  name: 'StartPage',
  components: { Footer, Header },
};
</script>

<style scoped>

.start-page {
  margin-top: -10px;
  background-image: url('../../assets/port.jpg');
  background-size: cover;
  background-position: 0% 35%;
  box-shadow:inset 0 0 0 2000px rgba(255, 255, 255, 0.2);
  height: 84%;
}

</style>
