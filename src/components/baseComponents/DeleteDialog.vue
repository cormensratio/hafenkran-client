<template>
  <div>
    <v-btn v-if="execution.status = 'RUNNING'" dark style="background-color: red"
           @click="dialog = true">
      Delete
    </v-btn>
    <v-btn v-else color="red" dark @click="dialog = true">
      Delete
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="500">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this Execution?
        </v-card-title>
        <v-card-actions>
          <v-btn class="error"
                 @click="deleteClicked">
            Yes, I want to delete</v-btn>
          <v-btn @click="dialog = false">No, I'm not sure</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    execution: {},
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
  },
  methods: {
    deleteClicked() {
      this.dialog = false;
      this.$emit('deleteClicked');
    },
  },
};
</script>

<style scoped>

</style>
