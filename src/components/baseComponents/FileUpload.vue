<template slot="body">
  <div class="container">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 12 : 2" class="p-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend m-auto">
            <label><p class="h1">Upload your experiment here:</p><br>
              <v-icon class="uploadicon" size="100">file_upload</v-icon>
              <input type="file" ref="file" id="file" style="display:none" @change="getFile"/>
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
                 class="btn btn-success" v-on:click="submitFile()">Submit
          </v-btn>
          <v-btn v-else disabled>Submit</v-btn>
          <slot name="button"></slot>
          <v-progress-circular
            indeterminate
            color="blue"
            v-if="loading"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import BasePage from './BasePage';
import UploadService from '../../service/UploadService';

export default {
  name: 'FileUpload',
  components: { BasePage },
  data() {
    return {
      file: null,
      timestamp: null,
      fileName: null,
      correctFileType: false,
      loading: false,
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
        this.correctFileType = UploadService.checkFileType(this.file);
        this.timestamp = UploadService.getTimeStamp();
      }
    },
    async submitFile() {
      this.loading = true;
      const uploadSucceeded = await UploadService.uploadFile(this.file, this.fileName);
      if (uploadSucceeded) {
        this.loading = false;
        this.$router.push('/experimentlist');
      }
    },
  },
};
</script>

<style scoped>
  .uploadicon:hover {
    color: var(--themeColor);
  }
</style>
