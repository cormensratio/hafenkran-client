import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, find } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

export const serviceUrl = process.env.CLUSTER_SERVICE_URL;

const ExecutionStore = {
  state: {
    executions: [
      {
        id: '1',
        experimentId: '1',
        name: 'Test Execution',
        createdAt: new Date(),
        startedAt: new Date(),
        terminatedAt: new Date(),
        status: 'RUNNING',
        ram: '',
        cpu: '',
        bookedTime: '',
        ownerId: '1',
      },
      {
        id: '2',
        experimentId: '1',
        name: 'Test Execution2',
        createdAt: new Date(),
        startedAt: new Date(),
        terminatedAt: new Date(),
        status: 'CANCELED',
        ram: '',
        cpu: '',
        bookedTime: '',
        ownerId: '',
      },
      {
        id: '3',
        experimentId: '1',
        name: 'Test Execution3',
        createdAt: new Date(),
        startedAt: new Date(),
        terminatedAt: new Date(),
        status: 'RUNNING',
        ram: '',
        cpu: '',
        bookedTime: '',
        ownerId: '',
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
        const executions = await ApiService.doGet(`${serviceUrl}/experiments/${experimentId}/executions`);

        if (!isNil(executions)) {
          commit('updateExecutions', executions);
        }
      }
    },
    async fetchAllExecutionsOfUser({ commit }) {
      const executions = await ApiService.doGet(`${serviceUrl}/executions`);

      if (!isNil(executions)) {
        commit('updateExecutions', executions);
      }
    },
    async terminateExecution({ dispatch }, executionId) {
      if (!isNil(executionId)) {
        const response = await ApiService.doPost(`${serviceUrl}/executions/${executionId}/cancel`);
        if (!isNil(response)) {
          dispatch('fetchAllExecutionsOfUser');
          return response;
        }
      }
      return null;
    },
    async deleteExecution({ dispatch }, executionId) {
      const response = await ApiService.doPost(`${serviceUrl}/executions/${executionId}/delete`);
      if (!isNil(response)) {
        dispatch('fetchAllExecutionsOfUser');
        return response;
      }
      return null;
    },
    getExecutionById({ state }, id) {
      if (!isNil(id)) {
        return find(state.executions, execution => execution.id === id);
      }
      return null;
    },
  },
};

export default ExecutionStore;
