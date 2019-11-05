<template>
  <base-page>
    <template slot="body">
      <div class="container" id="box">
        <div class="input-group mb-3">
          <div class="input-group-prepend" id="uploadBox">
            <label><strong id="uploadtext">Upload your Dockerfile here:</strong><br>
              <input type="file" ref="file" id="file"
                     @change="getFile"/>
              <div id="buttons">
                <v-btn v-on:click="submitFile()">Submit</v-btn>
                <v-btn v-on:click="test">klick</v-btn>
              </div>
            </label>
          </div>
        </div>
        <div id="postUploadInfos">
          <p v-if="timestamp!=null
          && correctFileType">Successfully uploaded at: {{timestamp}}</p>
          <label v-if="fileName !== null && correctFileType">You can rename your file here!
            <input id="name" ref="name" type="text" class="form-control"
                   @change="updateFileName"
                   :value="fileName"/></label>
        </div>
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
      console.log(this.datapack);
      console.log(this.fileName);
      console.log(this.file.type);
      // eslint-disable-next-line no-bitwise
      if (this.file.type === 'application/zip' | this.file.type === 'application/x-zip-compressed') {
        console.log('OK');
      } else {
        console.log('NOPE');
      }
    },
    updateFileName() {
      this.fileName = this.$refs.name.value;
      this.datapack[2] = this.fileName;
    },
    createTimeStamp() {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      this.timestamp = `${date} ${time}`;
    },
    getFile() {
      this.file = this.$refs.file.files[0];
      this.createTimeStamp();
      if (this.file != null) {
        if (this.file.type === 'application/x-zip-compressed') {
          // fill datapack with data
          this.fileName = this.file.name;
          this.correctFileType = true;
          console.log(this.file);
          console.log(this.file.name);
        } else {
          console.log('file type not correct');
          this.correctFileType = false;
        }
      }
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
    margin-top: 5%;
    margin-bottom: -5%;
  }
  #postUploadInfos {
    margin-top: 20%;
  }
</style>
