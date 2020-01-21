<template>
  <v-flex>
    <v-combobox multiple attach outline
                :items="comboboxItems"
                :label="label"
                :item-text="getItemText"
                v-model="selectedItems"
                small-chips
                @change="updateFilters($event)"
                class="filter-combobox"
    >
      <template v-if="this.type">
        <template slot="selection" slot-scope="data">
          <v-chip :small="true" v-if="data.item.name">{{data.item.name}}</v-chip>
          <v-chip :small="true" v-else>{{data.item}}</v-chip>
        </template>
      </template>
      <template slot="append">
        <v-icon @click="clearCombobox">close</v-icon>
      </template>
    </v-combobox>
  </v-flex>
</template>

<script>
import { isNil, map } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name: 'FilterCombobox',
  data() {
    return {
      filterItems: {},
      selectedItems: [],
      filterTypes: [
        'user',
      ],
    };
  },
  props: {
    value: String,
    label: String,
    items: undefined,
    type: String,
  },
  computed: {
    ...mapGetters(['userList']),
    comboboxItems() {
      if (this.type && this.type === this.filterTypes[0]) {
        return this.userList;
      }
      return this.items;
    },
  },
  methods: {
    getItemText(item) {
      if (this.type === this.filterTypes[0]) {
        return item.name;
      }
      return item;
    },
    updateFilters() {
      const updatedFilters = {};

      if (!isNil(this.type) && this.type === this.filterTypes[0]) {
        updatedFilters.ownerId = map(this.selectedItems, user => user.id);
      } else {
        updatedFilters[this.value] = this.selectedItems;
      }
      this.$emit('update', updatedFilters);
    },
    clearSelected() {
      this.selectedItems = [];
    },
    clearCombobox() {
      this.clearSelected();
      this.updateFilters();
    },
  },
};
</script>

<style scoped>

</style>
