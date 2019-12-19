<template>
  <v-footer fixed class="hafen-footer">
    <v-container>
      <v-layout align-center row>
        <v-flex grow>
          <v-divider></v-divider>
        </v-flex>
        <v-flex shrink>
          <img class="footer-logo" src="../../assets/hafenkran.png">
        </v-flex>
        <v-flex grow>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="ref-links">
          <button class="btn-link" @click="showInfo = true">About</button>
          <button class="ml-2 btn-link" @click="showInfo = true">Imprint</button>
        </v-flex>
      </v-layout>
    </v-container>
    <v-bottom-sheet v-model="showInfo" :persistent="false">
      <v-list class="sheet-content">
        <v-container>
          <v-layout>
            <v-flex>
              <div class="text-xs-left contributors">
                <h3 class="text-muted title">Contributors</h3>
                <div>Martin Loos</div>
                <div>Johannes Pannermayr</div>
                <div>Ralph Grashuber</div>
                <div>Simon Lichtnecker</div>
                <div>Kristin Fritsch</div>
                <div>Matthias Rauch</div>
                <div>David Schrenk</div>
              </div>
            </v-flex>
            <v-flex>
              <div class="text-xs-left">
                <h3 class="text-muted title">Imprint</h3>
                <div>hafenkran@ocean.com</div>
                <div>Port Street 42</div>
                <div>666 Shiptown</div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list>
    </v-bottom-sheet>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      showInfo: false,
    };
  },
};
</script>

<style scoped>
  .footer-logo {
    height: 50px;
    width: 50px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .hafen-footer {
    height: 120px !important;
    background-color: #e8ebed;
  }
  .ref-links {
    margin-top: -1%;
    text-align: left;
  }
  .title {
    font-size: large;
    margin-bottom: 20px;
  }
  .sheet-content {
    padding: 3%;
  }
  .contributors > div {
    margin-bottom: 10px;
  }
</style>
