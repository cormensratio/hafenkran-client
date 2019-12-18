<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn @click="test">
          test
        </v-btn>
      </v-flex>
      <v-flex>
        <statistics-component :chart-data="testText">
        </statistics-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { replace } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from '../baseComponents/StatisticsComponent';

export default {
  name: 'ExecutionStatisticsPage',
  components: { StatisticsComponent },
  props: {
    executionId: String,
  },
  data() {
    return {
      testText: '',
    };
  },
  methods: {
    ...mapActions(['fetchResultsByExecutionId']),
    test() {
      const csvB64 = 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK';
      const file = ResultService.extractFileObjectFromBase64String(csvB64, 'test');
      const csvJson = ResultService.convertCsVToJson(file);
    },
    showTest(text) {
      const csv = replace(text, ';', ',');
      const csv2 = csv.replace(/(\r\n|\n|\r)/gm, '\n');
      debugger;
      this.testText = csv2;
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
