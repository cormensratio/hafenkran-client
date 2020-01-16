<template>
  <div>
    <div>
      <div class="title mb-3">Resource usage information</div>
      <div>
        <v-select outline
                  label="Choose which info should be displayed"
                  class="time-select"
        >
        </v-select>
      </div>
    </div>
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
    </div>
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
          field: 'ram',
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
          field: 'cpu',
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
  .title {
    font-size: 14pt;
    font-weight: bold;
  }
  .time-select {
    max-width: 400px;
  }
</style>
