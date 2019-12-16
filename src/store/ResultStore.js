import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.REPORTING_SERVICE_URL;

Vue.use(Vuex);

const ResultStore = {
  state: {
    results: [
      {
        id: '',
        type: 'log',
      },
    ],
  },
  getters: {
    results: state => state.results,
  },
  mutations: {
    updateResults(state, results) {
      state.results = results;
    },
  },
  actions: {
    async fetchResultsByExecutionId({ commit }, executionId) {
      if (!isNil(executionId)) {
        const results = await ApiService.doGet(`${serviceUrl}/results/${executionId}`);
        if (!isNil(results)) {
          commit('updateResults', results);
          return results;
        }
      }
      return null;
    },
  },
};

export default ResultStore;
