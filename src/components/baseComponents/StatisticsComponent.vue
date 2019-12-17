<template>
  <vega-lite :data="data.values"></vega-lite>
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
      data: {
        name: '',
        format: {
          type: '',
          parse: '',
        },
        values: [
          {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
        ],
      },
    };
  },
};
</script>

<style scoped>

</style>
