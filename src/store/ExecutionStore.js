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
        id: '',
        experimentId: '',
        name: '',
        createdAt: 0,
        startedAt: 0,
        terminatedAt: 0,
        status: '',
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
    async cancelExecution({ dispatch }, executionId) {
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
