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
        <div class="input-description text-muted">
          Book a timespan on the cluster
        </div>
        <v-layout>
          <v-flex>
            <v-text-field label="Hours"
                          type="number"
                          outline
                          class="time-input"
                          v-model="bookedHours"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field label="Minutes"
                          type="number"
                          outline
                          class="time-input"
                          v-model="bookedMinutes"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <div class="input-description text-muted">
          Define resource usage
        </div>
        <v-layout>
          <v-flex>
            <v-text-field label="RAM"
                          v-model="ram"
                          outline type="number"
                          :rules="[rules.required, rules.positiveNumbers]"
                          min="1"
                          class="resource-input"
            >
            </v-text-field>
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
    <v-card-actions class="menu-buttons justify-content-end">
      <div>
        <v-btn @click="closeMenu()"> Cancel </v-btn>
        <v-btn dark style="background: var(--themeColor)" @click="startExperiment()">
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
      experimentId: '',
      ram: 2,
      cpu: 4,
      bookedHours: 0,
      bookedMinutes: 0,
    };
  },
  props: { experiment: {} },
  computed: {
    bookedTime() {
      return (this.bookedMinutes * 60) + (this.bookedHours * 60 * 60);
    },
  },
  methods: {
    ...mapActions(['runExecution']),
    closeMenu() {
      this.$emit('menuClosed');
    },
    async startExperiment() {
      if (!isNil(this.experimentId)) {
        const startedExecution = await this.runExecution({
          experimentId: this.experimentId,
          ram: this.ram,
          cpu: this.cpu,
          bookedTime: this.bookedTime,
        });
        if (!isNil(startedExecution)) {
          this.$router.push('/executionlist');
        }
      }
    },
    updateExperimentId() {
      if (!isNil(this.experiment)) {
        this.experimentId = this.experiment.id;
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
