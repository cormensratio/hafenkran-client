<template>
  <div v-if="chartData.length > 0">
    <vega-lite :data="spec.data.values" mark="line" :encoding="spec.data.encoding"></vega-lite>
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

</style>
