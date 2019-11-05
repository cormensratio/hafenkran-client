import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [{ name: 'TestDockerfile', uploadDate: '01.01.20', size: '500' }],
  },
  getters: {
    experiments: state => state.experiments,
  },
  mutations: {
    updateExperiments(state, experiments) {
      debugger;
      state.experiments = experiments;
    },
  },
  actions: {
    async fetchExperiments({ commit }) {
      const newExperiments = ApiService.doGet();
      commit('updateExperiments', newExperiments);
    },
  },
};

export default ExperimentStore;
