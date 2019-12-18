<template>
  <div class="text-xs-left">
    <span>{{ fileSizeText }}</span>
  </div>
</template>

<script>
import { isNil } from 'lodash';

export default {
  name: 'FileSizeCell',
  props: {
    size: String,
  },
  computed: {
    fileSizeText() {
      let newSize = this.size;
      let unit = 'Bytes';

      if (isNil(newSize)) {
        return '0 Bytes';
      }

      if (newSize >= 1024) {
        newSize /= 1024;
        unit = 'MBytes';
      }

      if (newSize >= 1024) {
        newSize /= 1024;
        unit = 'GBytes';
      }

      return `${Number(newSize).toFixed(2)} ${unit}`;
    },
  },
};
</script>

<style scoped>

</style>
