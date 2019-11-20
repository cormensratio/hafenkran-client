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
        experimentId: '1',
        executionName: 'Test Execution',
        createdAt: new Date(),
        terminatedAt: new Date(),
        status: 'RUNNING',
        ram: '',
        cpu: '',
        bookedTime: '',
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
        const executions = await ApiService.doGet(`${process.env.CLUSTER_SERVICE_URL}/experiments/${experimentId}/executions`);

        if (!isNil(executions)) {
          commit('updateExecutions', executions);
        }
      }
    },
    async fetchAllExecutionsOfUser({ commit }) {
      const executions = await ApiService.doGet(`${process.env.CLUSTER_SERVICE_URL}/executions`);

      if (!isNil(executions)) {
        commit('updateExecutions', executions);
      }
    },
    async terminateExecution(experimentName) {
      const executionId = this.fetchExecutionsByExperimentId(experimentName);
      console.log(executionId);
      ApiService.doPost(`${process.env.CLUSTER_SERVICE_URL}/executionCancel`, executionId)
        .then((response) => {
          if (!isNil(response)) {
            return true;
          }
          return false;
        });
    },
  },
};

export default ExecutionStore;
