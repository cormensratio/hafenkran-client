<template>
  <div class="container">
    <div class="a">
      <label><strong id="uploadtext">Upload your Dockerfile here:</strong><br>
        <input type="file" ref="file" id="file" @change="getFile"/>
        <v-btn v-on:click="submitFile()">Submit</v-btn>
        <v-btn v-on:click="test">klick</v-btn>
        <p v-if="timestamp!=null">Successfully uploaded at:{{timestamp}}</p>
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
      datapack: [{}],
      file: null,
      timestamp: null,
    };
  },
  methods: {
    test() {
      console.log(this.datapack);
    },
    getFile() {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${date} ${time}`;
      this.timestamp = dateTime;
      this.file = this.$refs.file.files[0];
      this.datapack[0] = this.file;
      this.datapack[1] = this.timestamp;
      console.log(this.file);
      console.log(this.file.name);
    },
    submitFile() {
      const formData = new FormData();
      formData.append('datapack', this.datapack);
      ApiService.doPost('/INSERT_ENDPOINT_HERE', formData, {
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
