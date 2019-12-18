<template slot="body">
  <div class="container">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 12 : 2" class="p-2">
        <div class="input-group">
          <div class="input-group-prepend m-auto">
            <label>
              <v-icon class="uploadicon" size="150">file_upload</v-icon>
              <input type="file" ref="file" id="file" style="display:none" @change="getFile"/>
            </label>
          </div>
        </div>
        <div>
          <div class="alert alert-success"
               v-if="timestamp!=null&& correctFileType">
            Your file is ready to be uploaded!
          </div>
          <div class="alert alert-danger" role="alert"
               v-else-if="timestamp!=null">Incorrect filetype
          </div>
          <v-text-field v-if="timestamp!=null && correctFileType" background-color="green"
            v-model="fileName" outline @keyup.enter="submitFile"
            label="Rename your .tar File here">
          </v-text-field>
          <v-text-field v-else-if="timestamp!=null && !correctFileType" background-color="red"
                        v-model="fileName" outline @keyup.enter="submitFile"
                        label="Rename your .tar File here">
          </v-text-field>
          <v-text-field v-else
                        v-model="fileName" outline @keyup.enter="submitFile"
                        label="Rename your .tar File here">
          </v-text-field>
        </div>
        <div>
          <v-btn v-if="correctFileType"
                 class="btn btn-success" @click="submitFile()">Submit
          </v-btn>
          <v-btn v-else disabled>Submit</v-btn>
          <slot name="button"/>
          <v-progress-circular
            indeterminate
            color="#106ee0"
            v-if="loading"
          />
        </div>
      </v-card>
    </v-hover>
    <v-snackbar v-model="snackShow" right>
      {{ snack }}
      <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
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
  computed: {
    ...mapGetters(['snack', 'snackShow']),
  },
  methods: {
    ...mapMutations(['setSnack']),
    ...mapActions(['triggerSnack']),
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
        this.$router.push('/experimentlist');
      } else {
        this.setSnack('Experiment could not be uploaded');
      }
      this.loading = false;
      this.triggerSnack();
    },
  },
};
</script>

<style scoped>
  .uploadicon:hover {
    color: var(--themeColor);
  }
</style>
