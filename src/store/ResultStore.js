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
