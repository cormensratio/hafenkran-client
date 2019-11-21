<template>
  <v-card>
    <v-container fluid>
      <v-layout col>
          <v-combobox
            v-model="executionDetails.ram"
            :items="ramOptions"
            label="RAM"
            attach=""
            type='Number'
          ></v-combobox>
      <v-combobox
      v-model="executionDetails.cpu"
      :items="cpuOptions"
      label="CPU Cores"
      attach=""
      type='Number'
      ></v-combobox>
        <v-btn color="blue" v-on:click="resetDetails()" >Reset</v-btn>
      </v-layout>
      <v-layout col>
        <v-spacer></v-spacer>
      <v-combobox
      v-model="executionDetails.bookedTime"
      :items="bookedTimeOptions"
      label="Time in Seconds"
      attach=""
      type='Number'
      ></v-combobox>
        <v-btn color="blue" v-on:click="startExperiment()">Start</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import ExperimentStore from '../../store/ExperimentStore';

export default {
  name: 'DropdownMenuVcard',
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
  props: { expId: String },
  methods: {
    resetDetails() {
      this.executionDetails.ram = 2;
      this.executionDetails.cpu = 4;
      this.executionDetails.bookedTime = 300;
    },
    startExperiment() {
      ExperimentStore.actions.runExecution(this.executionDetails);
    },
  },
  created() {
    this.executionDetails.experimentId = this.expId;
  },
};

</script>

<style scoped>
</style>
