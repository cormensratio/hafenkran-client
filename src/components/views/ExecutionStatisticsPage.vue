<template>
  <div class="row page-container">
    <div class="col-3">
      <v-list class="result-list">
        <v-list-tile>
          <div class="list-title">Execution results</div>
        </v-list-tile>
        <v-divider class="list-divider"></v-divider>
        <v-list-tile @click="showResourceUsage = true" class="option">
          <v-list-tile-title>Resource usage</v-list-tile-title>
          <v-list-tile-content>
            <v-icon>computer</v-icon>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(result, index) in resultList.resultList"
                     :key="index" class="option"
                     @click="loadResultContent(result)"
        >
          <v-list-tile-title>{{result.name}}</v-list-tile-title>
          <v-list-tile-content>
            <v-icon v-if="getResultType(result.type) === 'log'">description</v-icon>
            <v-icon v-if="getResultType(result.type) === 'csv'">timeline</v-icon>
            <v-icon v-if="getResultType(result.type) === ''">error</v-icon>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div class="col-9 bg-white result-container">
      <metric-statistics-view v-if="showResourceUsage"
                              :execution-id="executionId"
      >
      </metric-statistics-view>
      <div v-else class="result-statistics-container">
        <statistics-component v-if="getResultType(selectedResult.type ) === 'csv'"
                              :chart-data="chartData">
        </statistics-component>
        <div v-else-if="getResultType(selectedResult.type) === 'log'"
             class="log-container">{{ logData }}
        </div>
        <div v-else-if="!selectedResult"
             class="hint text-muted">
          Select a result
        </div>
        <div v-else class="hint text-muted">
          Result has unsupported format!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isNil, isEqual } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from '../baseComponents/StatisticsComponent';
import MetricStatisticsView from '../baseComponents/MetricStatisticsView';

export default {
  name: 'ExecutionStatisticsPage',
  components: { MetricStatisticsView, StatisticsComponent },
  data() {
    return {
      showResourceUsage: false,
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
      this.showResourceUsage = false;
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
  .list-title {
    justify-content: center;
    font-weight: bold;
    margin-top: -3%;
  }
  .option:hover {
    background-color: lightgray;
  }
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
    max-height: 60vh;
    border: 1.5px solid lightgray;
  }
  .result-list::-webkit-scrollbar {
    display: none;
  }
  .result-container {
    max-height: 60vh;
  }
  .result-statistics-container {
    height: 100%;
  }
  .list-divider {
    margin-top: -1%;
  }
  .page-container {
    margin: 10px;
  }
</style>
