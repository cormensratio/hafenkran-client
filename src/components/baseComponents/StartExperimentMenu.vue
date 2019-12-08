<template>
  <v-card class="p-3">
    <v-card-text class="details-container">
      <v-layout column>
        <v-flex class="text-left">
          <div class="mt-2 h3">Experiment: {{ experiment.name }}</div>
          <div class="mt-2">Uploaded: {{ getTimeStamp(experiment.createdAt) }}</div>
          <div class="mt-2">Size: {{ experiment.size }} Byte</div>
        </v-flex>
      </v-layout>
      <template slot="header">
        <div> Additional Actions</div>
      </template>
    </v-card-text>
    <v-divider class="divider"></v-divider>
    <v-card-text>
      <v-container>
        <v-combobox class="time-combobox"
                    v-model="executionDetails.bookedTime"
                    :items="bookedTimeOptions"
                    label="Time in Seconds"
                    attach
                    outline
                    type='Number'
                    min="0"
        ></v-combobox>
        <v-layout row>
          <v-flex class="mr-2">
            <v-text-field label="RAM"
                          v-model="executionDetails.ram"
                          outline type="number"
                          hint="Define RAM usage"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field label="CPU Cores"
                          v-model="executionDetails.cpu"
                          outline type="number"
                          hint="Define the number of Cores"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="justify-space-between">
        <v-btn dark color="blue" v-on:click="resetDetails()">
        Reset options
        </v-btn>
      <div>
        <v-btn @click="closeMenu()"> Cancel </v-btn>
        <v-btn dark color="blue" v-on:click="startExperiment()">
          Start execution
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import TimeStampMixin from '../../mixins/TimeStamp';
import RulesMixin from '../../mixins/Rules';


export default {
  name: 'StartExperimentMenu',
  mixins: [TimeStampMixin, RulesMixin],
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
    ...mapActions(['runExecution']),
    resetDetails() {
      this.executionDetails.ram = this.ramOptions[0];
      this.executionDetails.cpu = this.cpuOptions[1];
      this.executionDetails.bookedTime = this.bookedTimeOptions[0];
    },
    closeMenu() {
      this.$emit('menuClosed');
    },
    async startExperiment() {
      if (!isNil(this.executionDetails.experimentId)) {
        const startedExecution = await this.runExecution(this.executionDetails);
        if (!isNil(startedExecution)) {
          this.$router.push('/executionlist');
        }
      }
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
  .time-combobox {
    margin-bottom: -4%;
  }
  .divider {
    margin-top: -2%;
    margin-bottom: -2%;
  }
</style>
