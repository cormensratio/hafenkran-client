<template>
  <div class="filter-container">
    <div class="upper-filters">
      <filter-combobox ref="nameFilter"
                       :items="filters.name.filterOptions"
                       :label="filters.name.label"
                       :value="filters.name.value"
                       @update="applyFilter($event)"
                       class="filter-box"
      >
      </filter-combobox>
      <filter-combobox :items="filters.status.filterOptions"
                       :label="filters.status.label"
                       :value="filters.status.value"
                       @update="applyFilter($event)"
                       ref="statusFilter"
                       class="filter-box"
      >
      </filter-combobox>
      <filter-combobox :items="filters.user.filterOptions"
                       :label="filters.user.label"
                       :value="filters.user.value"
                       :type="filters.user.type"
                       @update="applyFilter($event)"
                       ref="userFilter"
                       class="filter-box"
                       v-if="user.isAdmin"
      >
      </filter-combobox>
      <v-spacer></v-spacer>
      <v-btn @click="clearAllFilters">Clear all</v-btn>
    </div>
    <div class="lower-filters">
      <v-text-field append-icon="search"
                    label="Search by name"
                    single-line outline
                    @input="quickSearch()"
                    v-model="searchString"
                    class="filter-box"
      >
      </v-text-field>
      <filter-date-time :label="filters.startTime.label"
                        :value="filters.startTime.value"
                        @update="applyFilter($event)"
                        class="filter-box"
      >
      </filter-date-time>
      <filter-date-time :label="filters.cancelTime.label"
                        :value="filters.cancelTime.value"
                        @update="applyFilter($event)"
                        class="filter-box"
      >
      </filter-date-time>
    </div>
    <div class="clear-button-container">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map, isNil, forEach } from 'lodash';
import FilterUsersCombobox from './FilterUsersCombobox';
import BaseFilterComponent from './BaseFilterComponent';
import FilterDateTime from './FilterDateTime';
import FilterCombobox from './FilterCombobox';

export default {
  name: 'ExecutionFilters',
  components: { FilterCombobox, FilterDateTime, BaseFilterComponent, FilterUsersCombobox },
  data() {
    return {
      searchString: '',
      selectedFilters: {},
      filters: {
        name: {
          label: 'Name',
          value: 'name',
          type: 'basic',
          filterOptions: [],
        },
        status: {
          label: 'Status',
          value: 'status',
          type: 'basic',
          filterOptions: [],
        },
        startTime: {
          label: 'Started at',
          value: 'startedAt',
          type: 'dateTime',
        },
        cancelTime: {
          label: 'Canceled at',
          value: 'terminatedAt',
          type: 'dateTime',
        },
        user: {
          label: 'User',
          value: '',
          type: 'user',
        },
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'executions', 'userList']),
    nameOptions() {
      return uniq(map(this.executions, this.filters.name.value));
    },
    statusOptions() {
      return uniq(map(this.executions, this.filters.status.value));
    },
  },
  methods: {
    clearAllFilters() {
      this.selectedFilters = {};
      forEach(this.$refs, (ref) => {
        ref.clearSelected();
      });
      this.$emit('applyFilters', this.selectedFilters);
    },
    applyFilter(filter) {
      if (!isNil(filter)) {
        const key = Object.keys(filter)[0];
        this.selectedFilters[key] = filter[key];
        this.$emit('applyFilters', this.selectedFilters);
      }
    },
    quickSearch() {
      this.$emit('quickSearch', this.searchString);
    },
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.status.filterOptions = this.statusOptions;
    },
  },
  mounted() {
    this.updateFilterOptions();
  },
};
</script>

<style scoped>
  .filter-container {
    background: white;
    padding: 1%;
    display: flex;
    flex-direction: column;
  }
  .upper-filters {
    display: flex;
    flex-direction: row;
  }
  .lower-filters {
    display: flex;
    flex-direction: row;
  }
  .filter-box {
    max-width: 38vh;
    width: 38vh;
    margin-right: 10px;
  }
</style>
