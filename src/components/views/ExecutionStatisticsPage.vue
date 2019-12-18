<template>
  <v-container>
    <v-layout row>
      <v-flex class="list-container">
        <v-list>
          <v-list-tile v-for="(result, index) in resultList.results" :key="index"
                       @click="showResult(result.id)">
            <v-list-tile-title>Result {{index + 1}}</v-list-tile-title>
            <v-list-tile-content>
              <div class="mr-1">{{result.type}}</div>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex>
        <statistics-component :chart-data="testText">
        </statistics-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { replace } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from '../baseComponents/StatisticsComponent';

export default {
  name: 'ExecutionStatisticsPage',
  components: { StatisticsComponent },
  data() {
    return {
      selectedResult: '',
      testText: '',
    };
  },
  props: {
    executionId: String,
  },
  computed: {
    ...mapGetters(['resultList']),
  },
  methods: {
    ...mapActions(['fetchResultsByExecutionId']),
    showResult(result) {
      this.selectedResult = result;
    },
    test() {
      const csvB64 = 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK';
      const file = ResultService.extractFileObjectFromBase64String(csvB64, 'test');
      const csvJson = ResultService.convertCsVToJson(file);
    },
    showTest(text) {
      const csv = replace(text, ';', ',');
      const csv2 = csv.replace(/(\r\n|\n|\r)/gm, '\n');
      debugger;
      this.testText = csv2;
    },
  },
  created() {
    this.fetchResultsByExecutionId(this.executionId);
  },
};
</script>

<style scoped>
  .list-container {
    max-width: 35vh;
  }
</style>
