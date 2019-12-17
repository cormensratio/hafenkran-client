<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn @click="test">
          test
        </v-btn>
      </v-flex>
      <v-flex>
        <statistics-component>
        </statistics-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ResultService from '../../service/ResultService';
import StatisticsComponent from '../baseComponents/StatisticsComponent';

export default {
  name: 'ExecutionStatisticsPage',
  components: { StatisticsComponent },
  props: {
    executionId: String,
  },
  methods: {
    ...mapActions(['fetchResultsByExecutionId']),
    test() {
      const csvB64 = 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK';
      const file = ResultService.extractFileObjectFromBase64String(csvB64);
      const content = ResultService.extractFileContent(file);
      debugger;
    },
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
