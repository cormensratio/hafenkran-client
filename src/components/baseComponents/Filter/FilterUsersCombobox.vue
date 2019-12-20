<template>
  <v-flex>
    <v-combobox multiple attach outline
                small-chips
                label="User"
                v-model="selectedItems"
                @change="updateFilters($event)"
                :items="userList"
                class="filter-combobox"
    >
      <template slot="item" slot-scope="data">
        <span> {{ data.item.name }}</span>
      </template>
      <template slot="selection" slot-scope="data">
        <v-chip :small="true">{{data.item.name}}</v-chip>
      </template>
    </v-combobox>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
import { map, isNil } from 'lodash';

export default {
  name: 'FilterUsersCombobox',
  data() {
    return {
      selectedItems: [],
    };
  },
  computed: {
    ...mapGetters(['userList']),
  },
  methods: {
    updateFilters() {
      const updatedFilters = {};

      if (!isNil(this.selectedItems) && this.selectedItems.length > 0) {
        updatedFilters.ownerId = map(this.selectedItems, user => user.id);
      }
      this.$emit('update', updatedFilters);
    },
    clearSelected() {
      this.selectedItems = [];
      this.$emit('update', this.selectedItems);
    },
  },
};
</script>

<style scoped>
  .filter-combobox {
    width: 25vh;
  }
</style>
