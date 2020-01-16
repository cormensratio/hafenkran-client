<template>
  <div>
    <div class="time-selection">
      <v-select outline
                label="Choose which info should be displayed"
                class="time-select mb-3"
                :items="timeOptions"
                @change="selectionFrameChanged"
      >
        <template slot="selection" slot-scope="data" @click="fetchMetrics">
          <span v-if="data">{{data.item.text}}</span>
        </template>
      </v-select>
      <v-btn class="reload-button">
        <v-icon>replay</v-icon>
        Reload Metrics
      </v-btn>
    </div>
    <div class="metrics-statistics-container">
      <div class="metric-container">
        <div>CPU Cores</div>
        <statistics-component :chart-data="cpuChartData"
                              :encoding="cpuEncoding"
        ></statistics-component>
      </div>
      <div class="metric-container">
        <div>RAM Usage</div>
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
      timeEncodingHours: 'utchoursminutesseconds',
      timeEncodingDate: 'utcdatehoursminutesseconds',
      timeOptions: [
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
          this.displayedMetrics = this.metrics;
        } else {
          const numberOfMetrics = this.metrics.length;
          this.displayedMetrics = this.metrics.slice(numberOfMetrics - (selection + 1),
            numberOfMetrics - 1);
        }
        this.getCpuChartData();
        this.getRamChartData();
      }
    },
    async fetchMetrics() {
      if (!isNil(this.executionId)) {
        const metrics = await this.fetchMetricsByExecutionId(this.executionId);
        if (isNil(metrics)) {
          this.setSnack('Failed fetching resource usage data');
          this.triggerSnack();
        } else {
          this.displayedMetrics = this.metrics;
          this.getCpuChartData();
          this.getRamChartData();
        }
      }
    },
  },
  mounted() {
    // await this.fetchMetrics();
    this.displayedMetrics = this.metrics;
    this.getCpuChartData();
    this.getRamChartData();
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
