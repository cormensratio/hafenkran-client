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
  },
};
</script>

<style scoped>
  .filter-combobox {
  }
</style>
