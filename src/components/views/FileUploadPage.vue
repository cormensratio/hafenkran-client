<template>
  <base-page>
    <template slot="body">
      <div class="container" id="box">
        <div class="input-group mb-3">
          <div class="input-group-prepend" id="uploadBox">
            <label><strong id="uploadtext">Upload your Dockerfile here:</strong><br><br>
              <file-upload accept=".zip,.rar"
                           :url="url"
                           :thumb-url='thumbUrl'
                           btn-label="Upload Dockerfile"
                           @change="onFileChange"></file-upload><br>
              <v-btn v-on:click="submitFile()">Submit</v-btn>
            </label>
          </div>
        </div>
        <p v-if="timestamp!=null && correctFileType">Successfully uploaded at: {{timestamp}}</p><br>
        <label v-if="fileName !== null && correctFileType">You can rename your file here!
          <input v-model="fileName" type="text" class="form-control"
                 placeholder="<Your File>" @change="updateFileName"/>
        </label>
      </div>
    </template>
  </base-page>
</template>

<script>

import Vue from 'vue';
import FileUpload from 'v-file-upload';
import ApiService from '../../service/ApiService';
import BasePage from '../baseComponents/BasePage';

Vue.use(FileUpload);

export default {
  name: 'FileUploadPage',
  components: { BasePage },
  data() {
    return {
      url: 'https://postman-echo.com/post',
      headers: { 'Content-Type': 'application/zip'},
      filesUploaded: [],
      file: null,
      timestamp: null,
      fileName: null,
      correctFileType: false,
    };
  },
  methods: {
    getTimestamp() {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      this.timestamp = `${date} ${time}`;
    },
    thumbUrl(file) {
      return file.myThumbUrlProperty;
    },
    onFileChange(file) {
      this.filesUploaded = file;
      this.getTimestamp();
      // testing
      console.log(file);
    },
    submitFile() {
      const formData = new FormData();
      formData.append('datapack', this.datapack);
      ApiService.doPost('http://localhost:8080/fileuploadpage', formData, {
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
    position: relative;
    background-color: lightgray;
    margin-top: 4%;
    padding-left: 20%;
    padding-right: 20%;
  }

  #uploadBox {
    margin: auto;
  }
</style>
