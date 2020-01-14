<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <statistics-component :chart-data="cpuChartData"></statistics-component>
        </v-flex>
        <v-flex>
          <statistics-component :chart-data="ramChartData"></statistics-component>
        </v-flex>
      </v-layout>
    </v-container>
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
  created() {
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

</style>
