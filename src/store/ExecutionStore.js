import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const ExecutionStore = {
  state: {
    executions: [
      {
        id: '1',
        startedAt: new Date(),
        terminatedAt: new Date(),
        status: 'running',
      },
    ],
  },
  getters: {
    executions: state => state.executions,
  },
  mutations: {
    updateExecutions(state, executions) {
      state.executions = executions;
    },
  },
  actions: {
    async fetchExecutionsByExperimentId({ commit }, experimentId) {
      if (!isNil(experimentId)) {
        const executions = await ApiService.doGet(`${process.env.CLUSTER_SERVICE_URL}/experiments/executions/6ebf4e82-6720-43f7-b1f3-6e8eb008605a`);

        if (!isNil(executions)) {
          commit('updateExecutions', executions);
        }
      }
    },
  },
};

export default ExecutionStore;
