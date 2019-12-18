<template>
  <v-container>
    <v-layout row>
      <v-flex md6>
        <v-list>
          <v-list-tile v-for="(result, index) in resultList.results" :key="index"
                       @click="loadResultContent(result)">
            <v-list-tile-title>Result {{index + 1}}</v-list-tile-title>
            <v-list-tile-content>
              <div class="mr-1">{{result.type}}</div>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex md6>
        <statistics-component v-if="selectedResult.type === 'csv'" :chart-data="chartData">
        </statistics-component>
        <div v-else> Result has unsupported format!</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isNil, isEqual } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from '../baseComponents/StatisticsComponent';

export default {
  name: 'ExecutionStatisticsPage',
  components: { StatisticsComponent },
  data() {
    return {
      selectedResult: '',
      chartData: [],
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
    loadResultContent(result) {
      this.selectedResult = result;
      if (!isNil(result) && !isNil(result.file) && !isEqual(result.file, '')) {
        const file = ResultService.extractFileObjectFromBase64String(result.file, result.id);
        ResultService.extractFileContent(file, this.showResult);
      }
    },
    showResult(fileContent) {
      debugger;
      const csvJson = ResultService.convertCsVToJson(fileContent);
      this.chartData = csvJson;
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
