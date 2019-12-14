<template>
  <div>
    <label class="text-muted ml-2">{{label}}</label>
    <v-combobox multiple attach outline
                height="3vh"
                :items="items"
                @change="updateFilters($event)"
    >
    </v-combobox>
  </div>
</template>

<script>
export default {
  name: 'FilterCombobox',
  props: {
    label: String,
    items: {},
  },
  methods: {
    updateFilters(filters) {
      this.$emit('update', filters);
    },
  },
};
</script>

<style scoped>

</style>
