<template>
  <v-card class="p-3">
    <v-card-text class="details-container">
      <v-layout column>
        <v-flex class="text-left">
          <div class="mt-2 mb-3 h3">Experiment: {{ experiment.name }}</div>
          <div class="mt-2"><b>Uploaded:</b> {{ getTimeStamp(experiment.createdAt) }}</div>
          <div class="mt-2"><b>Size: </b> {{ experiment.size }} Byte</div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider class="divider"></v-divider>
    <v-card-text>
      <v-container>
<!--        <v-combobox class="time-combobox"-->
<!--                    v-model="executionDetails.bookedTime"-->
<!--                    :items="bookedTimeOptions"-->
<!--                    label="Time in Seconds"-->
<!--                    attach-->
<!--                    outline-->
<!--                    type='Number'-->
<!--                    min="0"-->
<!--        ></v-combobox>-->
<!--        <vue-timepicker format="HH:mm:ss"-->
        <!--                        class="booked-time-selection"></vue-timepicker>-->
<!--        <span> Book execution time: </span>-->
<!--        <vue-timepicker format="HH:mm:ss" input-class="time-input-modifier"-->
<!--                        class="booked-time-selection"></vue-timepicker>-->
        <div class="input-description text-muted">
          Book a timespan on the cluster
        </div>
        <v-layout>
          <v-flex>
            <v-text-field label="Hours"
                          type="number"
                          outline
                          :value="0"
                          class="time-input"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field label="Minutes"
                          type="number"
                          outline
                          :value="0"
                          class="time-input"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-icon class="mt-3">clear</v-icon>
          </v-flex>
        </v-layout>
        <div class="input-description text-muted">
          Define resource usage
        </div>
        <v-layout>
          <v-flex>
            <v-text-field label="RAM"
                          v-model="executionDetails.ram"
                          outline type="number"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
                          class="resource-input"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field label="CPU Cores"
                          v-model="executionDetails.cpu"
                          outline type="number"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
                          class="resource-input"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-icon class="mt-3">clear</v-icon>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="menu-buttons justify-content-end">
      <div>
        <v-btn @click="closeMenu()"> Cancel </v-btn>
        <v-btn dark color="blue" @click="startExperiment()">
          Start execution
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import VueTimePicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';
import TimeStampMixin from '../../mixins/TimeStamp';
import RulesMixin from '../../mixins/Rules';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker';

export default {
  name: 'StartExperimentMenu',
  components: { VueTimepicker },
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
  .booked-time-selection {
    margin-bottom: 2%;
    border: 2px solid rgba(0,0,0,.54);
    border-radius: 4px;
    min-height: 58px;
  }
  .time-input {
    width: 120px;
  }
  .resource-input {
    width: 120px;
  }
  .input-description {
    text-align: left;
    font-size: medium;
    margin-bottom: 10px;
  }
  .divider {
    margin-top: -1%;
    margin-bottom: -3%;
  }
  .menu-buttons {
    margin-top: -8%;
  }
  .clear-button {
    height: 20px;
    width: 20px;
  }
</style>
<style>
  .time-input-modifier {
    margin-top: 8%;
    border-style: none !important;

  }
  .time-input-modifier:focus {
    outline: none;
  }
</style>
