<template>
  <v-flex>
    <datetime-picker :label="'Select Datetime'"></datetime-picker>
  </v-flex>
</template>

<script>
import DatetimePicker from '../DateTimePicker';

export default {
  name: 'DateTimeFilter',
  components: { DatetimePicker },
  data() {
    return {
      inputClass: 'datetime-picker-input',
    };
  },
  mounted() {

  },
};
</script>

<style scoped>
.datetime-picker-input {
  border: 2px solid rgba(0,0,0,.54) !important;
}
</style>

<style>
  /*.theme--light.v-text-field>.v-input__control>.v-input__slot {*/
  /*  min-height: 20px;*/
  /*  border: 2px solid rgba(0,0,0,.54) !important;*/
  /*}*/
  /*.theme--light.v-text-field:not(.v-input-
  /*  border: 2px solid rgba(0,0,0,.54) !important;*/
  /*}*/
</style>
