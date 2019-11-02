<template>
  <div class="container" id="box">
    <div class="input-group mb-3">
      <div class="input-group-prepend" id="uploadBox">
        <label><strong id="uploadtext">Upload your Dockerfile here:</strong><br>
          <input type="file" ref="file" id="file" @change="getFile"/>
          <v-btn v-on:click="submitFile()">Submit</v-btn>
          <v-btn v-on:click="test">klick</v-btn>
        </label>
      </div>
    </div>
    <p v-if="timestamp!=null && correctFileType">Successfully uploaded at: {{timestamp}}</p><br>
    <label v-if="fileName !== null && correctFileType">You can rename your file here!
      <input id="name" ref="name" type="text" class="form-control"
             placeholder="<Your File>" @change="updateFileName" :value="fileName"/>
    </label>
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
      fileName: null,
      correctFileType: false,
    };
  },
  methods: {
    test() {
      console.log(this.datapack);
      console.log(this.fileName);
      console.log(this.file.type);
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
    getFile() {
      // create timestamp
      this.file = this.$refs.file.files[0];
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      this.timestamp = `${date} ${time}`;
      if (this.file != null) {
        if (this.file.type === 'application/x-zip-compressed') {
          // fill datapack with data
          this.fileName = this.file.name;
          this.datapack[0] = this.file;
          this.datapack[1] = this.timestamp;
          this.datapack[2] = this.fileName;
          this.correctFileType = true;
          console.log(this.file);
          console.log(this.file.name);
        } else {
          console.log('file type not correct');
          this.datapack[0] = null;
          this.datapack[1] = null;
          this.datapack[2] = null;
          this.correctFileType = false;
        }
      }
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
    position: relative;
    background-color: lightgray;
    margin-top: 3%;
    padding-left: 20%;
    padding-right: 20%;
  }

  #uploadBox {
    margin: auto;
  }
</style>
