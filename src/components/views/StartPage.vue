<template>
  <div class="base">
    <Header></Header>
    <div class="start-page">
      <div class="footnote">
        <p>by Ronan Furuta on <a style="color:white; text-decoration: underline"
                                 href="https://unsplash.com/photos/daSq9zhROxY">unsplash.com</a></p>
      </div>
      <div>
        <v-card
          class="content"
          max-width="500"
          color="rgb(100, 100, 100, 0.6)"
          style="margin: 10px"
        >
          <v-card-text>
            <p class="display-1 welcome-card-text-title">
              Containerize now!
            </p>
            <div class="welcome-card-text justify-center">
              HAFENKRAN is the best platform to quickly deploy your Docker containers
              on a high performance cluster system, while giving you full control
              over managing allowed resource usage and the ability to evaluate the complex
              output of your computations efficiently.
            </div>
          </v-card-text>
          <v-card-actions class="justify-center signup-button">
            <v-btn
              style="background-color:  var(--themeColor)"
              dark
              @click="getStarted"
            >
              Get started
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <Footer class="footer-shadow"></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../baseComponents/Header';
import Footer from '../baseComponents/Footer';

export default {
  name: 'StartPage',
  components: { Footer, Header },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    getStarted() {
      if (this.isAuthenticated) {
        this.$router.push('/experimentlist');
      } else {
        this.$router.push('signup');
      }
    },
  },
};
</script>

<style scoped>

  .start-page {
    background-image: url('../../assets/port.jpg');
    background-size: cover;
    background-position: 0% 35%;
    box-shadow: inset 0 0 0 2000px rgba(255, 255, 255, 0.2), 0 0px 10px #000;;
    height: 82%;
    width: 100%;
    margin-top: -10px;
  }

  .base {
    margin-top: 10px;
    height: 100%;
  }

  .welcome-card-text-title {
    font-weight: bold;
    text-align: center;
    color: white;
  }

  .welcome-card-text {
    text-align: center;
    color: white;
    font-size: 15px;
  }

  .signup-button{
    margin-bottom: 15px;
  }

  .content {
    position: absolute;
    top: 30%;
    left: 30%;
    transform: translate(-50%, -50%);
  }

  .footnote {
    position: absolute;
    bottom: 11%;
    right: 8px;
    color: white;
  }

</style>
