<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" @change="handleFileUpload"/>
      </label>
      <v-btn v-on:click="submitFile()">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import { AxiosInstance as Axios } from 'axios';

export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.file = input.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      // eslint-disable-next-line no-undef
      Axios.post('/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('SUCCESS!!');
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('FAILURE!!');
        });
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 5%;
  }
</style>
