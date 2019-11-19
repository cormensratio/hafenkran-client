import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

const serviceUrl = process.env.CLUSTER_SERVICE_URL;


Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [{ userId: 'c8aef4f2-92f8-47eb-bbe9-bd457f91f0e6', name: 'TestDockerfile', createdAt: '01.01.20', size: '500' }],
  },
  getters: {
    experiments: state => state.experiments,
  },
  mutations: {
    updateExperiments(state, experiments) {
      state.experiments = experiments;
    },
  },
  actions: {
    async fetchExperiments({ commit }) {
      const newExperiments = await ApiService.doGet(`${process.env.CLUSTER_SERVICE_URL}/experiments`);

      if (!isNil(newExperiments)) {
        commit('updateExperiments', newExperiments);
      }
    },
    async runExecution(executionDetails) {
      const executionId = executionDetails.experimentId;
      await ApiService.doPost(`${serviceUrl}/experiments/${executionId}/execute`, executionDetails);
    },
  },
};

export default ExperimentStore;
