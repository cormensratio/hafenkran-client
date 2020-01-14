<template>
  <div v-if="chartData.length > 0" class="chart-container">
    <vega-lite :data="spec.data.values"
               mark="line"
               :encoding="spec.data.encoding"
               class="chart"
    ></vega-lite>
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
    encoding: {
      x: {
        field: '',
        type: '',
      },
      y: {
        field: '',
        type: '',
      },
    },
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
            x: { field: 'x', type: 'ordinal' },
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
  /*.marks {*/
  /*  width: 100%;*/
  /*  height: 100% !important;*/
  /*}*/
</style>
