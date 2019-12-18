import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, filter } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.CLUSTER_SERVICE_URL;


Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [
      {
        id: '1',
        name: 'TestDockerfile',
        createdAt: '01.01.20',
        size: '500',
        ownerId: 1,
      },
    ],
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
      const newExperiments = await ApiService.doGet(`${serviceUrl}/experiments`);

      if (!isNil(newExperiments)) {
        commit('updateExperiments', newExperiments);
      }
    },
    getExperimentFromId({ state }, id) {
      debugger;
      const experiment = filter(state.experiments, e => e.id === id)[0];
      if (!isNil(experiment)) {
        return experiment;
      }
      return null;
    },
    async runExecution(state, executionDetails) {
      if (!isNil(executionDetails)) {
        const response = await ApiService.doPost(
          `${serviceUrl}/experiments/${executionDetails.experimentId}/execute`, executionDetails);

        if (!isNil(response)) {
          return response;
        }
      }
      return null;
    },
  },
};

export default ExperimentStore;
