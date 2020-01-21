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
      <filter-combobox :items="filters.user.filterOptions"
                       :label="filters.user.label"
                       :value="filters.user.value"
                       :type="filters.user.type"
                       @update="applyFilter($event)"
                       ref="userFilter"
                       class="filter-box"
      >
      </filter-combobox>
      <filter-date-time :label="filters.createdAt.label"
                        :value="filters.createdAt.value"
                        @update="applyFilter($event)"
                        class="filter-box"
      >
      </filter-date-time>
    </div>
    <div class="lower-filters">
      <v-text-field append-icon="search"
                    label="Quick search by name"
                    single-line outline
                    @input="quickSearch()"
                    v-model="searchString"
                    class="filter-box"
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="clear-button" @click="clearAllFilters">Clear all</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map, isNil, forEach } from 'lodash';
import FilterCombobox from './FilterCombobox';
import FilterUsersCombobox from './FilterUsersCombobox';
import FilterDateTime from './FilterDateTime';

export default {
  name: 'ExperimentFilters',
  components: { FilterCombobox, FilterUsersCombobox, FilterDateTime },
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
        createdAt: {
          label: 'Created at',
          value: 'createdAt',
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
    ...mapGetters(['user', 'experiments']),
    nameOptions() {
      return uniq(map(this.experiments, this.filters.name.value));
    },
  },
  methods: {
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
    },
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
  .clear-button {
    align-self: center;
  }
</style>
