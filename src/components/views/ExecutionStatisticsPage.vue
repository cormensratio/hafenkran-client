<template>
  <v-container class="result-container">
      <div class="row">
        <div class="col-4">
          <v-list class="result-list">
            <v-list-tile v-for="(result, index) in resultList.results"
                         :key="index"
                         @click="loadResultContent(result)">
              <v-list-tile-title>Result {{index + 1}}</v-list-tile-title>
              <v-list-tile-content>
                <div class="mr-1">{{result.type}}</div>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
        <div class="col-8 bg-white result-container">
          <statistics-component v-if="getResultType(selectedResult.type ) === 'csv'"
                                :chart-data="chartData">
          </statistics-component>
          <div v-else-if="getResultType(selectedResult.type) === 'log'"
               class="log-container">{{ logData }}
          </div>
          <div v-else-if="!selectedResult"
               class="hint text-muted">
            Select a Result
          </div>
          <div v-else class="hint text-muted">
            Result has unsupported format!
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
      if (isEqual(this.getResultType(resultType), 'csv')) {
        return this.showResultCsv;
      } else if (isEqual(this.getResultType(resultType), 'log')) {
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
    getResultType(type) {
      if (!isNil(type)) {
        return type.toString().toLowerCase();
      }
      return '';
    },
  },
  created() {
    this.fetchResultsByExecutionId(this.executionId);
  },
};
</script>

<style scoped>
  .hint {
    font-size: 14pt;
    margin-top: 2%;
  }
  .log-container {
    overflow-y: auto;
    height: 100%;
  }
  .log-container::-webkit-scrollbar {
    display: none;
  }
  .result-list {
    overflow-y: scroll;
    max-height: 38vh;
  }
  .result-list::-webkit-scrollbar {
    display: none;
  }
  .result-container {
    max-height: 38vh;
  }
</style>
