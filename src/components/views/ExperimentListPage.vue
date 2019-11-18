<template>
  <base-page>
      <template slot="body">
        <div class="container">
          <div>
            <v-data-table
              :headers="headers"
              :items="experiments"
              :expand="expand"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
              <td class="text-xs-left">{{ props.item.size }}</td>
              </tr>
            </template>
              <template v-slot:expand="props">
                <v-card>
                  <v-container fluid>
                    <v-btn color="blue" v-on:click="resetDetails()">Reset</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="blue">Start</v-btn>
                    <v-combobox
                      v-model.number="selectedRam"
                      :items="ramOptions"
                      label="RAM"
                      attach=""
                      type='Number'
                    ></v-combobox>
                  <v-combobox
                    v-model.number="selectedCpu"
                    :items="cpuOptions"
                    label="CPU Cores"
                    attach=""
                    type='Number'
                  ></v-combobox>
                    <v-combobox
                      v-model.number="selectedTime"
                      :items="timeOptions"
                      label="Time in Seconds"
                      attach=""
                      type='Number'
                    ></v-combobox>
                  </v-container>
                </v-card>
              </template>
            </v-data-table>
          </div>
          <div>
            <v-btn :href="'/newexperiment'"> Upload File </v-btn>
            <p>{{ executionDetails }}</p>
            <v-btn :to="'/newexperiment'"> Upload File </v-btn>
          </div>
        </div>
      </template>
  </base-page>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';


export default {
  name: 'ExperimentListPage',
  components: { BasePage },

  computed: {
    ...mapGetters(['experiments']),
  },
  data() {
    return {
      message: '',
      expand: true,
      selectedRam: 2,
      ramOptions: [2, 4, 6, 8,
      ],
      selectedCpu: 4,
      cpuOptions: [2, 4, 6, 8,
      ],
      selectedTime: 300,
      timeOptions: [300, 360, 720, 920],
      headers: [
        {
          text: 'Dockerfile Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Uploaded', value: 'uploadDate', sortable: true },
        { text: 'Size', value: 'size', sortable: true },
      ],
      executionDetails: [
        {
          experimentId: '',
          name: '',
          ram: 2,
          cpu: 4,
          time: 300,
        },
      ],
    };
  },
  watch: {
    selectedRam() {
      this.executionDetails[0].ram = this.selectedRam;
    },
    selectedCpu() {
      this.executionDetails[0].cpu = this.selectedCpu;
    },
    selectedTime() {
      this.executionDetails[0].time = this.selectedTime;
    },
  },
  methods: {
    ...mapActions(['fetchExperiments']),
    getTimeStamp(utcTime) {
      return moment(utcTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
    resetDetails() {
      this.selectedRam = 2;
      this.selectedCpu = 4;
      this.selectedTime = 300;
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>

</style>
