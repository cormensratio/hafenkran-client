<template>
  <v-card>
    <v-card-title>
      <span class="filter-title ml-4">Additional filters:</span>
    </v-card-title>
    <v-card-text>
      <v-container class="mb-5">
        <v-layout>
          <v-flex class="filter-combobox mr-2">
            <filter-combobox label="Name"
                             :items="nameOptions"
                             @update="filters.name = $event"
            ></filter-combobox>
          </v-flex>
          <v-flex class="filter-combobox mr-2">
            <filter-combobox label="Status"
                             :items="statusOptions"
                             @update="filters.status = $event"
            ></filter-combobox>
          </v-flex>
          <v-flex class="filter-combobox" v-if="user.isAdmin">
            <filter-combobox label="User"></filter-combobox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <div class="apply-button-container">
      <v-btn dark color="blue" class="m-3" @click="applyFilters()">Apply Filters</v-btn>
    </div>
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
      filters: {
        name: [],
        user: [],
        status: [],
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'executions']),
    nameOptions() {
      return uniq(map(this.executions, 'name'));
    },
    statusOptions() {
      return uniq(map(this.executions, 'status'));
    },
  },
  methods: {
    applyFilters() {
      this.$emit('applyFilters', this.filters);
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
  .apply-button-container {
    display: flex;
    justify-content: flex-end;
  }
</style>
