<template>
  <div v-if="chartData.length > 0" class="chart-container">
    <vega-lite :data="spec.data.values"
               :mark="spec.mark"
               :encoding="spec.data.encoding"
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
import { isNil } from 'lodash';

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
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        },
        mark: 'line',
      },
    };
  },
  watch: {
    chartData() {
      this.spec.data.values = this.chartData;
    },
    encoding() {
      this.spec.data.encoding = this.encoding;
    },
  },
  created() {
    if (!isNil(this.encoding)) {
      this.spec.encoding = this.encoding;
    }
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

<style>
  /*override vega style to display bigger charts*/
  .marks {
    width: 100%;
    height: 100% !important;
  }
</style>
