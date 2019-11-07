import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [{ experimentName: 'TestDockerfile', createdAt: '01.01.20', size: '500' }],
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
      const newExperiments = ApiService.doGet('/experiments');

      if (!isNil(newExperiments)) {
        commit('updateExperiments', newExperiments);
      }
    },
  },
};

export default ExperimentStore;
