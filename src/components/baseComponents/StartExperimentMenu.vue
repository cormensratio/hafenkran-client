<template>
  <v-card class="p-3">
    <v-card-text class="details-container">
      <v-layout column>
        <v-flex class="text-left">
          <v-btn class="float-right" @click="closeDetails">
            <v-icon> close</v-icon>
          </v-btn>
          <div class="mt-2 h3">Experiment: {{ experiment.name }}</div>
          <div class="mt-2">Uploaded: {{ getTimeStamp(experiment.createdAt) }}</div>
          <div class="mt-2">Size: {{ experiment.size }} Byte</div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row>
        <v-flex>
          <v-combobox
            v-model="executionDetails.ram"
            :items="ramOptions"
            label="RAM"
            type='Number'
            attach
          ></v-combobox>
          <v-combobox
            v-model="executionDetails.cpu"
            :items="cpuOptions"
            label="CPU Cores"
            attach
            type='Number'
          ></v-combobox>
        </v-flex>
        <v-flex class="ml-3">
          <v-combobox
            v-model="executionDetails.bookedTime"
            :items="bookedTimeOptions"
            label="Time in Seconds"
            attach=""
            type='Number'
          ></v-combobox>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="col-12 justify-center">
        <v-btn dark color="blue" class="col-3" v-on:click="resetDetails()">
        Reset options
        </v-btn>
        <v-btn dark color="blue" class="col-3" v-on:click="startExperiment()">
          Start execution
        </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { isNil } from 'lodash';
import ExperimentStore from '../../store/ExperimentStore';
import { timeStampMixin } from '../../mixins/TimeStamp';


export default {
  name: 'StartExperimentMenu',
  mixins: [timeStampMixin],
  data() {
    return {
      ramOptions: [2, 4, 6, 8,
      ],
      cpuOptions: [2, 4, 6, 8,
      ],
      bookedTimeOptions: [300, 360, 720, 920,
      ],
      executionDetails:
          {
            experimentId: '',
            ram: 2,
            cpu: 4,
            bookedTime: 300,
          },
    };
  },
  props: { experiment: {} },
  methods: {
    resetDetails() {
      this.executionDetails.ram = 2;
      this.executionDetails.cpu = 4;
      this.executionDetails.bookedTime = 300;
    },
    startExperiment() {
      if (!isNil(this.executionDetails.experimentId)) {
        ExperimentStore.actions.runExecution(this.executionDetails);
        this.$router.push('/executionlist');
      }
    },
    closeDetails() {
      this.$emit('close');
    },
  },
  created() {
    this.executionDetails.experimentId = this.expId;
  },
};

</script>

<style scoped>
  .executions-title {
    justify-content: center;
    margin-top: -30px;
  }
</style>
