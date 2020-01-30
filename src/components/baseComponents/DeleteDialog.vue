<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500">
      <v-card class="pb-3">
        <v-card-title>
          <h2>
            {{ headerMessage }}
          </h2>
          <span class="text-muted m-auto">{{hint}}</span>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn class="error" @click="deleteClicked">
            Yes, I want to delete</v-btn>
          <v-btn @click="hideDialog">No, I'm not sure</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    id: {},
    externDialog: false,
    headerMessage: String,
    hint: undefined,
  },
  data() {
    return {
      dialog: false,
      execution: {},
    };
  },
  watch: {
    externDialog() {
      this.dialog = this.externDialog;
    },
    dialog() {
      if (!this.dialog) {
        this.hideDialog();
      }
    },
  },
  methods: {
    deleteClicked() {
      this.$emit('deleteClicked', this.id);
    },
    hideDialog() {
      this.$emit('hideDialog');
    },
  },
};
</script>

<style scoped>

</style>
