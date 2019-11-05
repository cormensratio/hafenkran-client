<template>
  <base-page>
    <template slot="body">
      <div class="container" id="box">
        <div class="input-group mb-3">
          <div class="input-group-prepend" id="uploadBox">
            <label><p class="h1" id="uploadtext">Upload your Dockerfile here:</p><br>
              <input type="file" ref="file" id="file"
                     @change="getFile"/>
            </label>
          </div>
        </div>
        <div id="postUploadInfos">
          <div class="alert alert-success" v-if="timestamp!=null
          && correctFileType" >Successfully uploaded at: {{timestamp}}</div>
          <div class="alert alert-danger" role="alert"
               v-else-if="timestamp!=null">Incorrect filetype</div>
          <div class="alert alert-primary" role="alert"
               v-if="fileName !== null && correctFileType">You can rename your file here!
            <input v-model="fileName" type="text" class="form-control"/></div>
        </div>
        <div id="buttons">
          <v-btn v-on:click="submitFile()">Submit</v-btn>
          <v-btn v-on:click="test()">Klick</v-btn></div>
      </div>
    </template>
  </base-page>
</template>

<script>

import ApiService from '../../service/ApiService';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'FileUpload',
  components: { BasePage },
  data() {
    return {
      file: null,
      timestamp: null,
      fileName: null,
      correctFileType: false,
      text: '',
    };
  },
  methods: {
    test() {
      console.log(this.file);
      console.log(this.fileName);
      console.log(this.timestamp);
    },
    createFileName() {
      this.fileName = this.$refs.file.files[0].name;
    },
    createTimeStamp() {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      this.timestamp = `${date} ${time}`;
    },
    getFile() {
      this.file = this.$refs.file.files[0];
      this.createFileName();
      this.createTimeStamp();
      if (this.file != null) {
        if (this.file.type === 'application/x-zip-compressed') {
          // fill datapack with data
          this.correctFileType = true;
        } else {
          console.log('file type not correct');
          this.correctFileType = false;
        }
      }
      console.log(this.correctFileType);
    },
    submitFile() {
      const formData = new FormData();
      formData.append('data', {
        file: this.file,
        timestamp: this.timestamp,
        filename: this.filename,
      });
      ApiService.doPost('https://webhook.site/a3c6a1cb-4fb4-4d81-b155-c77179b50311', formData, {
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
  #buttons {
    margin-bottom: 1%;
  }
</style>
