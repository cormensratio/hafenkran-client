<template>
  <div>
    <div class="time-selection">
      <v-select outline
                label="Choose which info should be displayed"
                class="time-select mb-3"
                :items="timeFrameOptions"
                v-model="selectedTimeFrame"
                @change="selectionFrameChanged"
      >
        <template slot="selection" slot-scope="data" @click="fetchMetrics">
          <span v-if="data">{{data.item.text}}</span>
        </template>
      </v-select>
      <v-select outline
                label="Choose which info should be displayed"
                class="time-select mb-3"
                :items="timeFormatOptions"
                v-model="selectedTimeFormat"
                @change="selectedFormatChanged"
      >
        <template slot="selection" slot-scope="data" @click="fetchMetrics">
          <span v-if="data">{{data.item.text}}</span>
        </template>
      </v-select>
      <v-btn class="reload-button" @click="fetchMetrics">
        <v-icon>replay</v-icon>
        Reload Metrics
      </v-btn>
    </div>
    <div class="metrics-statistics-container">
      <div class="metric-container">
        <div>CPU Cores (in: {{metrics.cpuUnit}})</div>
        <statistics-component :chart-data="cpuChartData"
                              :encoding="cpuEncoding"
        ></statistics-component>
      </div>
      <div class="metric-container">
        <div>RAM Usage (in: {{metrics.ramUnit}})</div>
        <statistics-component :chart-data="ramChartData"
                              :encoding="ramEncoding"
        ></statistics-component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isNil } from 'lodash';
import ResultService from '../../service/ResultService';
import StatisticsComponent from './StatisticsComponent';

export default {
  name: 'MetricStatisticsView',
  components: { StatisticsComponent },
  data() {
    return {
      displayedMetrics: [],
      timeFrameOptions: [
        {
          text: 'Complete timeline',
          value: 'all',
        },
        {
          text: 'Last 60 minutes',
          value: 60,
        },
        {
          text: 'Last 5 minutes',
          value: 5,
        },
      ],
      timeFormatOptions: [
        {
          text: 'mmdd, yyyy hh:ss',
          value: 'utcyearmonthdatehoursminutes',
        },
        {
          text: 'hh:mm:ss',
          value: 'utchoursminutesseconds',
        },
        {
          text: 'mm:ss',
          value: 'utcminutesseconds',
        },
        {
          text: 'ss',
          value: 'utcseconds',
        },
      ],
      selectedTimeFrame: {},
      selectedTimeFormat: {},
      cpuChartData: [],
      ramChartData: [],
      ramEncoding: {
        x: {
          field: 'timestamp',
          type: 'temporal',
          timeUnit: 'utchoursminutesseconds',
        },
        y: {
          field: 'memory',
          type: 'quantitative',
        },
      },
      cpuEncoding: {
        x: {
          field: 'timestamp',
          type: 'temporal',
          timeUnit: 'utchoursminutesseconds',
        },
        y: {
          field: 'cpu',
          type: 'quantitative',
        },
      },
    };
  },
  props: {
    executionId: '',
  },
  computed: {
    ...mapGetters(['metrics']),
  },
  methods: {
    ...mapActions(['fetchMetricsByExecutionId', 'triggerSnack']),
    ...mapMutations(['setSnack']),
    getCpuChartData() {
      const data = ResultService.convertMetricsToChartData(this.displayedMetrics, 'cpu');
      if (!isNil(data)) {
        this.cpuChartData = data;
      }
    },
    getRamChartData() {
      const data = ResultService.convertMetricsToChartData(this.displayedMetrics, 'memory');
      if (!isNil(data)) {
        this.ramChartData = data;
      }
    },
    selectionFrameChanged(selection) {
      if (!isNil(selection)) {
        if (isNaN(selection)) {
          this.displayedMetrics = this.metrics.metricList;
        } else {
          const numberOfMetrics = this.metrics.metricList.length;
          this.displayedMetrics = this.metrics.metricList.slice(numberOfMetrics - (selection + 1),
            numberOfMetrics - 1);
        }
        this.getCpuChartData();
        this.getRamChartData();
      }
    },
    selectedFormatChanged(selection) {
      this.cpuEncoding.x.timeUnit = selection;
      this.ramEncoding.x.timeUnit = selection;
    },
    async fetchMetrics() {
      if (!isNil(this.executionId)) {
        const metrics = await this.fetchMetricsByExecutionId(this.executionId);
        if (isNil(metrics)) {
          this.setSnack('Failed fetching resource usage data');
          this.triggerSnack();
        } else {
          this.displayedMetrics = this.metrics.metricList;
          this.getCpuChartData();
          this.getRamChartData();
        }
      }
    },
  },
  async mounted() {
    await this.fetchMetrics();
    this.selectedTimeFormat = this.timeFormatOptions[1];
    this.selectedTimeFrame = this.timeFrameOptions[0];
  },
};
</script>

<style scoped>
  .metrics-statistics-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;
    width: 100%;
    margin-top: 1%;
    padding-bottom: 10px;
    overflow: auto;
  }
  .metric-container {
    height: 100%;
    width: 100%;
  }
  .reload-button {
    background: var(--themeColor);
  }
  .time-select {
    max-width: 400px;
  }
  .time-selection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
