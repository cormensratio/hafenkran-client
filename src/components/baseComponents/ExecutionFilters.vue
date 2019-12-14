<template>
  <v-card>
    <v-card-title>
      <span class="filter-title ml-4">Additional filters:</span>
    </v-card-title>
    <v-card-text>
      <v-container class="mb-5">
        <v-layout>
          <v-flex class="filter-combobox mr-2">
            <filter-combobox label="Name" :items="nameOptions"></filter-combobox>
          </v-flex>
          <v-flex class="filter-combobox mr-2">
            <filter-combobox label="Status"></filter-combobox>
          </v-flex>
          <v-flex class="filter-combobox" v-if="user.isAdmin">
            <filter-combobox label="User"></filter-combobox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map } from 'lodash';
import FilterCombobox from './FilterCombobox';

export default {
  name: 'ExecutionFilters',
  components: { FilterCombobox },
  data() {
    return {
      executionName: [],
      userName: [],
      status: [],
    };
  },
  computed: {
    ...mapGetters(['user', 'executions']),
    nameOptions() {
      return uniq(map(this.executions, 'name'));
    },
  },
};
</script>

<style scoped>
  .filter-combobox {
    max-width: 300px;
    max-height: 30px;
  }
  .filter-title {
    font-size: 14pt;
    margin-bottom: -2%;
  }
</style>
