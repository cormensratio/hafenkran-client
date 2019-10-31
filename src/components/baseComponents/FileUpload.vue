<template>
  <div class="container">
    <div class="a">
      <label><strong id="uploadtext">Upload your Dockerfile here:</strong><br>
        <input type="file" ref="file" id="file" @change="getFile"/>
        <v-btn v-on:click="submitFile()">Submit</v-btn>
      </label>
    </div>
  </div>
</template>

<script>

import ApiService from '../../service/ApiService';

export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
    };
  },
  methods: {
    getFile() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      ApiService.doPost('/Service', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      );
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 10%;
    background-color: beige;
  }

  #uploadtext {
    margin: auto;
  }
</style>
