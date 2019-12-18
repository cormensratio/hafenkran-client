<template>
  <v-container>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <v-list>
            <v-list-tile v-for="(result, index) in resultList.results" :key="index" id=index
                         @click="loadResultContent(result)">
              <v-list-tile-title>Result {{index + 1}}</v-list-tile-title>
              <v-list-tile-content>
                <div class="mr-1">{{result.type}}</div>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
        <div class="col-8 bg-white">
          <statistics-component v-if="selectedResult.type === 'csv'" :chart-data="chartData">
          </statistics-component>
          <div v-else-if="selectedResult.type === 'log'">{{ logData }}</div>
          <div v-else> Result has unsupported format!</div>
        </div>
      </div>
    </div>
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
      logData: '',
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
        const callbackFunction = this.getCallback(result.type);
        ResultService.extractFileContent(file, callbackFunction);
      }
    },
    getCallback(resultType) {
      if (isEqual(resultType, 'csv')) {
        return this.showResultCsv;
      } else if (isEqual(resultType, 'log')) {
        return this.showResultLog;
      }
      return null;
    },
    showResultCsv(fileContent) {
      const csvJson = ResultService.convertCsVToJson(fileContent);
      this.chartData = csvJson;
    },
    showResultLog(fileContent) {
      this.logData = fileContent;
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
