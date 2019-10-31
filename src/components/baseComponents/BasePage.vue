<template>
  <div>
    <Header></Header>
    <FileUpload></FileUpload>
    <slot name="body"></slot>
  </div>
</template>

<script>
import Header from './Header';
import FileUpload from './FileUpload';

export default {
  name: 'BasePage',
  components: { FileUpload, Header },
};
</script>

<style scoped>

</style>
