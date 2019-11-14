<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <div class="input-group mb-3">
          <div class="input-group-prepend m-auto">
            <label><p class="h1">Upload your Dockerfile here:</p><br>
              <input type="file" ref="file" id="file" @change="getFile"/>
            </label>
          </div>
        </div>
        <div class="mb-2">
          <div class="alert alert-success" v-if="timestamp!=null
          && correctFileType">Timestamp: {{timestamp}} <br>
            Your file is ready to be uploaded!
          </div>
          <div class="alert alert-danger" role="alert"
               v-else-if="timestamp!=null">Incorrect filetype
          </div>
          <div class="alert alert-primary" role="alert"
               v-if="fileName !== null && correctFileType">You can rename your file here!
            <input v-model="fileName" type="text" class="form-control"/></div>
        </div>
        <div>
          <v-btn v-if="correctFileType"
                 class="btn btn-success" v-on:click="submitFile()">Submit</v-btn>
          <v-btn v-else class="btn btn-danger">No file to submit</v-btn>
          <v-btn to="/experimentlist">See experiments</v-btn>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import UploadService from '../../service/UploadService';

export default {
  name: 'CreateExperimentPage',
  components: { BasePage },
  data() {
    return {
      file: null,
      timestamp: null,
      fileName: null,
      correctFileType: false,
    };
  },
  methods: {
    getFileName() {
      return this.$refs.file.files[0].name;
    },
    getFile() {
      this.file = this.$refs.file.files[0];
      if (this.file !== null) {
        this.fileName = this.getFileName();
        this.correctFileType = UploadService.checkFileType(this.fileName);
        this.timestamp = UploadService.getTimeStamp();
      }
    },
    submitFile() {
      UploadService.uploadFile(this.file, this.fileName);
      this.$router.push('/experimentlist');
    },
  },
};
</script>

<style scoped>
  .container {
    position: relative;
    background-color: lightblue;
    margin-top: 4%;
    padding-left: 20%;
    padding-right: 20%;
  }
</style>
