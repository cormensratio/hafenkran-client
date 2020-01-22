import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, find } from 'lodash';
import store from './store';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.CLUSTER_SERVICE_URL;


Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [
      {
        id: '',
        name: '',
        createdAt: '',
        size: '',
        ownerId: '',
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
    async getExperimentNameFromId({ state }, id) {
      const experiment = find(state.experiments, ['experimentId', id]);
      if (!isNil(experiment)) {
        return experiment.name;
      }
      return 'No name Found';
    },
    async runExecution(state, executionDetails) {
      if (!isNil(executionDetails)) {
        const response = await ApiService.doPost(
          `${serviceUrl}/experiments/${executionDetails.experimentId}/execute`, executionDetails);

        if (!isNil(response)) {
          await store.dispatch('fetchAllExecutionsOfUser');
          return response;
        }
      }
      return null;
    },
    async shareExperiment(state, { experimentId, userId }) {
      if (!isNil(experimentId) && !isNil(userId)) {
        const response = await ApiService.doPost(
          `${serviceUrl}/experiments/${experimentId}/share/${userId}`, {},
        );
        if (!isNil(response)) {
          return true;
        }
      }
      return false;
    },
  },
};

export default ExperimentStore;
