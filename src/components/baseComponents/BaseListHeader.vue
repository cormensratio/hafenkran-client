<template>
  <v-expansion-panel class="toolbar-header">
    <v-expansion-panel-content style="background: #106ee0">
      <template slot="actions">
        <v-icon color="white">$vuetify.icons.expand</v-icon>
      </template>
      <template slot="header">
        <div class="title">{{title}}</div>
      </template>
     <slot name="expansion-body"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'BaseListHeader',
  props: {
    title: String,
  },
};
</script>

<style scoped>
  .title {
    font-size: 14pt;
    color: white;
  }
</style>
<style>
  .v-chip v-chip--select-multi v-chip--small theme--light {
    margin-bottom: 5%;
  }
</style>
