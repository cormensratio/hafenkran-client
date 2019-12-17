<template>
  <v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExecutionStatisticsPage',
  props: {
    executionId: String,
  },
  methods: {
    ...mapActions(['fetchResultsByExecutionId']),
  },
  computed: {
    ...mapGetters(['resultList']),
  },
  created() {
    this.fetchResultsByExecutionId(this.executionId);
  },
};
</script>

<style scoped>

</style>
