import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.REPORTING_SERVICE_URL;

Vue.use(Vuex);

const ResultStore = {
  state: {
    resultList: {
      executionId: '',
      updatedAt: '',
      results: [
        {
          id: '',
          name: '',
          type: '',
          file: '',
        },
      ],
    },
    metrics: [
      {
        ram: 1,
        cpu: 4,
        timeStamp: 1,
      },
      {
        ram: 2,
        cpu: 5,
        timeStamp: 2,
      },
      {
        ram: 1,
        cpu: 6,
        timeStamp: 3,
      },
      {
        ram: 3,
        cpu: 5,
        timeStamp: 4,
      },
    ],
  },
  getters: {
    resultList: state => state.resultList,
    metrics: state => state.metrics,
  },
  mutations: {
    updateResults(state, resultList) {
      state.resultList = resultList;
    },
    updateMetrics(state, metrics) {
      state.metrics = metrics;
    },
  },
  actions: {
    async fetchResultsByExecutionId({ commit }, executionId) {
      if (!isNil(executionId)) {
        const resultList = await ApiService.doGet(`${serviceUrl}/results/${executionId}`);
        if (!isNil(resultList)) {
          commit('updateResults', resultList);
          return resultList;
        }
      }
      return null;
    },
    async fetchMetricsByExecutionId({ commit }, executionId) {
      if (!isNil(executionId)) {
        const metrics = await ApiService.doGet(`${serviceUrl}/metrics/${executionId}`);
        if (!isNil(metrics)) {
          commit('updateMetrics', metrics);
          return metrics;
        }
      }
      return null;
    },
  },
};

export default ResultStore;
