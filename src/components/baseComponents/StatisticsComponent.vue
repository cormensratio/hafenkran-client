<template>
  <vega-lite></vega-lite>
</template>

<script>
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
      },
    };
  },
};
</script>

<style scoped>

</style>
