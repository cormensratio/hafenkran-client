import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, find } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [
      { id: 1,
        name: 'TestDockerfile',
        createdAt: '01.01.20',
        size: '500',
        userId: 1,
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
      const newExperiments = await ApiService.doGet(`${process.env.CLUSTER_SERVICE_URL}/experiments`);

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
  },
};

export default ExperimentStore;
