<template>
  <v-card class="p-3">
    <v-card-text class="details-container">
      <v-icon @click="closeMenu" class="float-right mb-4">close</v-icon>
      <v-layout column>
        <v-flex class="text-left">
          <div class="mt-2 mb-3 h3">Experiment: {{ experiment.name }}</div>
          <div class="mt-2"><b>Uploaded:</b> {{ getTimeStamp(experiment.createdAt) }}</div>
          <div class="mt-2"><file-size-cell :size="experiment.size"></file-size-cell></div>
          <div v-if="previousRam > 0" class="mt-2">
            <b>Previously run for: </b>{{ previousHours }} Hours {{ previousMinutes }} Minutes
            <b>with</b> <file-size-cell>{{ previousRam }}</file-size-cell>
            Ram and {{ previousCpu }} Cpu</div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider class="divider"></v-divider>
    <v-card-text>
      <v-container>
        <div class="input-description text-muted">
          Book a timespan on the cluster
        </div>
        <v-layout>
          <v-flex>
            <v-text-field label="Hours"
                          type="number"
                          outline
                          class="time-input mr-1"
                          v-model="bookedHours"
                          min="0"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field label="Minutes"
                          type="number"
                          outline
                          class="time-input"
                          v-model="bookedMinutes"
                          min="0"
                          @change="checkMinutes"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <div class="input-description text-muted">
          Define resource usage
        </div>
        <v-layout>
          <v-flex>
            <file-size-input label="RAM"
                          @input="ramChanged($event)"
                          outline type="number"
                          :initialValue="ram"
                          :initialUnit="'GB'"
                          :rules="[rules.required, rules.positiveNumbers]"
                          class="resource-input mr-1"
            >
            </file-size-input>
          </v-flex>
          <v-flex>
            <v-text-field label="CPU Cores"
                          v-model="cpu"
                          outline type="number"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
                          class="resource-input"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="menu-buttons justify-content-center">
      <div>
        <v-btn dark style="background: var(--themeColor)" @click="startExperiment()">
          Start execution
        </v-btn>
      </div>
    </v-card-actions>
    <v-progress-circular
      size="50"
      indeterminate
      color="#106ee0"
      v-if="loading"
    />
  </v-card>
</template>
<script>
import { isNil } from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import TimeStampMixin from '../../mixins/TimeStamp';
import RulesMixin from '../../mixins/Rules';
import FileSizeCell from './FileSizeCell';
import FileSizeInput from './FileSizeInput';

export default {
  name: 'StartExperimentMenu',
  components: { FileSizeInput, FileSizeCell },
  mixins: [TimeStampMixin, RulesMixin],
  data() {
    return {
      experimentId: '',
      ram: 2,
      cpu: 4,
      bookedHours: 1,
      bookedMinutes: 30,
      loading: false,
      previousRam: 0,
      previousCpu: 0,
      previousHours: 0,
      previousMinutes: 0,
    };
  },
  props: { experiment: {} },
  computed: {
    ...mapGetters(['snackShow']),
    bookedTime() {
      return (this.bookedMinutes * 60) + (this.bookedHours * 60 * 60);
    },
    /**
     * Returns booked RAM in KiB
     * @returns {number}
     */
    bookedRam() {
      return Math.round(this.ram / 1000);
    },
    /**
     * Converts booked cpu to unit MilliCore
     * @returns {number}
     */
    bookedCpu() {
      return this.cpu * 1000;
    },
  },
  methods: {
    ...mapActions(['runExecution', 'triggerSnack']),
    ...mapMutations(['setSnack', 'showSnack', 'setColor']),
    closeMenu() {
      this.$emit('menuClosed');
    },
    ramChanged(value) {
      this.ram = value;
    },
    async startExperiment() {
      this.loading = true;
      if (!isNil(this.experimentId)
        && this.checkInputs(this.bookedTime, this.bookedCpu, this.ram)) {
        const startedExecution = await this.runExecution({
          experimentId: this.experimentId,
          ram: this.bookedRam,
          cpu: this.bookedCpu,
          bookedTime: this.bookedTime,
        });
        this.loading = false;
        if (!isNil(startedExecution)) {
          this.previousRam = startedExecution.ram;
          this.previousCpu = startedExecution.cpu;
          this.previousMinutes = this.bookedMinutes;
          this.previousHours = this.bookedHours;
          this.setSnack('Execution started successfully');
          this.$router.push('/executionlist');
          this.closeMenu();
        } else {
          this.setSnack('Execution could not be started');
        }
      }
      this.loading = false;
      this.triggerSnack();
    },
    checkMinutes() {
      if (this.bookedMinutes >= 60) {
        const tempMinutes = this.bookedMinutes;
        const addedHours = Math.floor(tempMinutes / 60);
        this.bookedHours = this.bookedHours + addedHours;
        this.bookedMinutes = this.bookedMinutes % 60;
      }
    },
    updateExperimentId() {
      if (!isNil(this.experiment)) {
        this.experimentId = this.experiment.id;
      }
    },
    checkInputs(time, cpu, ram) {
      if (this.rules.positiveNumbers(time)
        && this.rules.positiveNumbers(cpu) && this.rules.positiveNumbers(ram)) {
        return true;
      }
      this.setSnack('You need to provide RAM, CPU and Time');
      this.setColor('error');
      return false;
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
</style>
