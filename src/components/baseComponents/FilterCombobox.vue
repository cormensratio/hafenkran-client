<template>
  <div>
    <label class="text-muted ml-2">{{label}}</label>
    <v-combobox multiple attach outline
                height="3vh"
                :items="items"
    >
    </v-combobox>
  </div>
</template>

<script>
export default {
  name: 'FilterCombobox',
  props: {
    label: String,
    items: [],
  },
};
</script>

<style scoped>

</style>
