<template>
  <div v-if="chartData.length > 0" class="chart-container">
    <vega-lite :data="chartData"
               :mark="spec.mark"
               :encoding="encoding"
               :spec="spec"
               class="chart"
    ></vega-lite>
  </div>
  <div v-else>
    No chart data to display...
  </div>
</template>

<script>
import VueVega from 'vue-vega';
import Vue from 'vue';

Vue.use(VueVega);

export default {
  name: 'StatisticsComponent',
  props: {
    chartData: '',
    encoding: {},
  },
  data() {
    return {
      spec: {
        data: {
          name: 'ResultStatistics',
          format: {
            type: 'json',
          },
          values: [],
        },
        mark: 'line',
        autosize: 'fit',
        height: 400,
        width: 600,
      },
    };
  },
  watch: {
    chartData() {
      this.spec.data.values = this.chartData;
    },
  },
};
</script>

<style scoped>
  .chart-container {
    height: 100%;
    width: 100%;
  }
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
