<template>
  <div class="text-xs-left">
    <v-chip :color="chipColor" >{{ status ? '' : 'No Status' }}</v-chip>
  </div>
</template>

<script>
export default {
  name: 'StatusCell',
  props: {
    status: String,
  },
  computed: {
    chipColor() {
      switch (this.status) {
        case 'RUNNING':
          return 'green';
        case 'WAITING':
          return 'yellow';
        case 'CANCELED':
          return 'orange';
        case 'FAILED':
          return 'red';
        case 'ABORTED':
          return 'red';
        case 'FINISHED':
          return 'success';
        default:
          return 'red';
      }
    },
  },
};
</script>

<style scoped>

</style>
