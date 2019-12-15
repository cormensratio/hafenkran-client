<template>
  <div>
    <v-combobox multiple attach outline
                :items="items"
                :label="label"
                v-model="selected"
                small-chips
                allow-overflow="false"
                @change="updateFilters($event)"
    >
    </v-combobox>
  </div>
</template>

<script>
export default {
  name: 'FilterCombobox',
  data() {
    return {
      selected: [],
    };
  },
  props: {
    label: String,
    items: {},
  },
  methods: {
    updateFilters() {
      this.$emit('update', this.selected);
    },
  },
};
</script>

<style scoped>

</style>
