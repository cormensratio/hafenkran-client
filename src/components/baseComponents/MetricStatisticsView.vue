<template>
  <div class="metrics-statistics-container">
    <div class="metric-container">
      <statistics-component :chart-data="cpuChartData"
                            :encoding="cpuEncoding"
      ></statistics-component>
    </div>
    <div class="metric-container">
      <statistics-component :chart-data="ramChartData"
                            :encoding="ramEncoding"
      ></statistics-component>
    </div>
<!--    <v-container>-->
<!--      <v-layout>-->
<!--        <v-flex>-->
<!--          <statistics-component :chart-data="cpuChartData"></statistics-component>-->
<!--        </v-flex>-->
<!--        <v-flex>-->
<!--          <statistics-component :chart-data="ramChartData"></statistics-component>-->
<!--        </v-flex>-->
<!--      </v-layout>-->
<!--    </v-container>-->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isNil } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from './StatisticsComponent';

export default {
  name: 'MetricStatisticsView',
  components: { StatisticsComponent },
  data() {
    return {
      cpuChartData: [],
      ramChartData: [],
      ramEncoding: {
        x: {
          field: 'timestamp',
          type: 'temporal',
          timeUnit: 'utcyearmonthdatehoursminutesseconds',
        },
        y: {
          field: 'RAM',
          type: 'quantitative',
        },
      },
      cpuEncoding: {
        x: {
          field: 'timestamp',
          type: 'temporal',
          timeUnit: 'utcyearmonthdatehoursminutesseconds',
        },
        y: {
          field: 'CPU Cores',
          type: 'quantitative',
        },
      },
    };
  },
  props: {
    executionId: '',
  },
  computed: {
    ...mapGetters(['metrics']),
  },
  methods: {
    ...mapActions(['fetchMetricsByExecutionId', 'triggerSnack']),
    ...mapMutations(['setSnack']),
    getCpuChartData() {
      const data = ResultService.convertMetricsToChartData(this.metrics, 'cpu');
      if (!isNil(data)) {
        this.cpuChartData = data;
      }
    },
    getRamChartData() {
      const data = ResultService.convertMetricsToChartData(this.metrics, 'ram');
      if (!isNil(data)) {
        this.ramChartData = data;
      }
    },
  },
  mounted() {
    // if (!isNil(this.executionId)) {
    //   const metrics = this.fetchMetricsByExecutionId(this.executionId);
    //   if (isNil(metrics)) {
    //     this.setSnack('Failed fetching resource usage data');
    //     this.triggerSnack();
    //   } else {
    //     this.getCpuChartData();
    //     this.getRamChartData();
    //   }
    // }
    this.getCpuChartData();
    this.getRamChartData();
  },
};
</script>

<style scoped>
  .metrics-statistics-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;
    width: 100%;
    margin-top: 1%;
    padding-bottom: 10px;
  }
  .metric-container {
    height: 100%;
    width: 100%;
  }
</style>
