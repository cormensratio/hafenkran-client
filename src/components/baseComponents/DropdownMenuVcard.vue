<template>
  <v-card>
    <v-container fluid>
      <v-btn color="blue" v-on:click="resetDetails()">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue">Start</v-btn>
      <div>{{this.props}}</div>
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

<script>
export default {
  name: 'DropdownMenuVcard',
  data() {
    return {
      selectedRam: 2,
      ramOptions: [2, 4, 6, 8,
      ],
      selectedCpu: 4,
      cpuOptions: [2, 4, 6, 8,
      ],
      selectedTime: 300,
      timeOptions: [300, 360, 720, 920],
      executionDetails:
      {
        experimentId: '',
        name: '',
        ram: 2,
        cpu: 4,
        time: 300,
      },
    };
  },
  methods: {
    resetDetails() {
      this.selectedRam = 2;
      this.selectedCpu = 4;
      this.selectedTime = 300;
    },
  },
  watch: {
    selectedRam() {
      this.executionDetails.ram = this.selectedRam;
    },
    selectedCpu() {
      this.executionDetails.cpu = this.selectedCpu;
    },
    selectedTime() {
      this.executionDetails.time = this.selectedTime;
    },
  },
};

</script>

<style scoped>
</style>
