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
    size: undefined,
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
        unit = 'KBytes';
      }

      if (newSize >= 1024) {
        newSize /= 1024;
        unit = 'MBytes';
      }

      return `${Number(newSize).toFixed(2)} ${unit}`;
    },
  },
  watch: {
    size() {
    },
  },
};
</script>

<style scoped>

</style>
