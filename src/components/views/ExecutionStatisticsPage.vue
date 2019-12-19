<template>
  <v-container>
    <v-layout row>
      <v-flex class="list-container">
        <v-list>
          <v-list-tile v-for="(result, index) in resultList.results" :key="index"
                       @click="showResult(result.id)">
            <v-list-tile-title>Result {{index + 1}}</v-list-tile-title>
            <v-list-tile-content>
              <div class="mr-1">{{result.type}}</div>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ExecutionStatisticsPage',
  data() {
    return {
      selectedResult: '',
    };
  },
  props: {
    executionId: String,
  },
  computed: {
    ...mapGetters(['resultList']),
  },
  methods: {
    ...mapActions(['fetchResultsByExecutionId']),
    showResult(result) {
      this.selectedResult = result;
    },
  },
  created() {
    this.fetchResultsByExecutionId(this.executionId);
  },
};
</script>

<style scoped>
  .list-container {
    max-width: 35vh;
  }
</style>
