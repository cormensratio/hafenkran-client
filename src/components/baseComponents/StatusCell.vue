<template>
  <div class="text-xs-left">
    <v-chip :color="chipColor" >{{ statusText }}</v-chip>
  </div>
</template>

<script>
import { isEqual } from 'lodash';

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
    statusText() {
      if (isEqual(this.status, '')) {
        return 'No Status';
      }
      return this.status;
    },
  },
};
</script>

<style scoped>

</style>
