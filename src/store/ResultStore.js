import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.REPORTING_SERVICE_URL;

Vue.use(Vuex);

const ResultStore = {
  state: {
    resultList: {
      executionId: '1',
      updatedAt: '',
      results: [
        {
          id: '1',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '2',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '3',
          type: 'log',
          file: 'RGFzIGlzdCBlaW4gdGVzdCBkdSBzcGFzdAo=',
        },
      ],
    },
  },
  getters: {
    resultList: state => state.resultList,
  },
  mutations: {
    updateResults(state, resultList) {
      state.resultList = resultList;
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
  },
};

export default ResultStore;
