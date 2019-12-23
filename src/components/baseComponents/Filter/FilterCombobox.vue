<template>
  <v-flex>
    <v-combobox multiple attach outline
                :items="items"
                :label="label"
                v-model="selectedItems"
                small-chips
                @change="updateFilters($event)"
                class="filter-combobox"
    >
      <template slot="append">
        <v-icon @click="clearCombobox">close</v-icon>
      </template>
    </v-combobox>
  </v-flex>
</template>

<script>
export default {
  name: 'FilterCombobox',
  data() {
    return {
      selectedItems: [],
    };
  },
  props: {
    value: String,
    label: String,
    items: {},
  },
  methods: {
    updateFilters() {
      const updatedFilters = {};
      updatedFilters[this.value] = this.selectedItems;
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
  .filter-combobox {
    min-width: 20vh;
    width: 25vh;  }
</style>
