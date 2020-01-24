import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
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
    async updatePermittedUsers(state, { experimentId, permittedUsers }) {
      if (!isNil(experimentId) && !isNil(permittedUsers)) {
        const response = await ApiService.doPost(
          `${serviceUrl}/experiments/${experimentId}/permittedUsers`, { permittedUsers },
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
