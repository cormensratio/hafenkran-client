import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const ExperimentStore = {
  state: {
    experiments: [{ name: 'TestDockerfile', uploadDate: '01.01.20', size: '500' }],
    experimentsMock: [{ userId: 'c8aef4f2-92f8-47eb-bbe9-bd457f91f0e6', experimentName: 'experiment1', createdAt: '2019-11-04T12:06:16.461', size: 300 },
      { userId: 'c8aef4f2-92f8-47eb-bbe9-bd457f91f0e6', experimentName: 'experiment2', createdAt: '2019-11-04T12:06:16.469', size: 1024 }],
  },
  getters: {
    experiments: state => state.experiments,
    experimentsMock: state => state.experimentsMock,
  },
  mutations: {
    updateExperiments(state, experiments) {
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
