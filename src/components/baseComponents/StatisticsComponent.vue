<template>
  <vega-lite :spec="spec"></vega-lite>
</template>

<script>
import VueVega from 'vue-vega';
import Vue from 'vue';

Vue.use(VueVega);

export default {
  name: 'StatisticsComponent',
  props: {
    type: 'csv',
    chartData: {},
  },
  data() {
    return {
      spec: {
        data: {
          name: 'TEEEST',
          format: {
            type: '',
            parse: '',
          },
          values: [
            { a: 'A', b: 28 }, { a: 'B', b: 55 }, { a: 'C', b: 43 },
            { a: 'D', b: 91 }, { a: 'E', b: 81 }, { a: 'F', b: 53 },
            { a: 'G', b: 19 }, { a: 'H', b: 87 }, { a: 'I', b: 52 },
          ],
        },
        mark: 'line',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' },
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
