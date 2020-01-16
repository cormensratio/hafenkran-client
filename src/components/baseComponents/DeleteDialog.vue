<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500">
      <v-card>
        <v-card-title>
          <h2>
            Are you sure you want to delete this Execution?
          </h2>
        </v-card-title>
        <v-card-actions>
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
    externExecution: {},
    externDialog: false,
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
  },
  methods: {
    deleteClicked() {
      this.$emit('deleteClicked', this.externExecution.id);
    },
    hideDialog() {
      this.$emit('hideDialog');
    },
  },
};
</script>

<style scoped>

</style>
