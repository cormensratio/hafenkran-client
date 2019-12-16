<template>
  <v-card class="p-3">
    <v-card-text class="details-container">
      <v-layout column>
        <v-flex class="text-left">
          <v-btn class="float-right" @click="closeDetails">
            <v-icon>close</v-icon>
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
          ></v-combobox>
          <v-combobox
            v-model="executionDetails.cpu"
            :items="cpuOptions"
            label="CPU Cores"
            type='Number'
          ></v-combobox>
        </v-flex>
        <v-flex class="ml-3">
          <v-combobox
            v-model="executionDetails.bookedTime"
            :items="bookedTimeOptions"
            label="Time in Seconds"
            type='Number'
          ></v-combobox>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-progress-circular
      size="50"
      indeterminate
      color="blue"
      v-if="loading"
    ></v-progress-circular>
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
import { mapActions, mapMutations } from 'vuex';
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
      loading: false,
    };
  },
  props: { experiment: {} },
  methods: {
    ...mapActions(['runExecution']),
    ...mapMutations(['setSnack']),
    resetDetails() {
      this.executionDetails.ram = this.ramOptions[0];
      this.executionDetails.cpu = this.cpuOptions[1];
      this.executionDetails.bookedTime = this.bookedTimeOptions[0];
    },
    async startExperiment() {
      this.loading = true;
      if (!isNil(this.executionDetails.experimentId)) {
        const startedExecution = await this.runExecution(this.executionDetails);
        this.loading = false;
        if (!isNil(startedExecution)) {
          this.$router.push('/executionlist');
        } else {
          this.setSnack('Experiment could not be started');
          this.$emit('notstarted');
        }
      }
    },
    closeDetails() {
      this.$emit('close');
    },
    updateExperimentId() {
      if (!isNil(this.experiment)) {
        this.executionDetails.experimentId = this.experiment.id;
      }
    },
  },
  updated() {
    this.updateExperimentId();
  },
  created() {
    this.updateExperimentId();
  },
};

</script>

<style scoped>
</style>
