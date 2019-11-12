import Vue from 'vue';
import Vuex from 'vuex';
import { isEqual, isNil } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const UserStore = {
  state: {
    user: {
      id: '',
      username: '',
      isAdmin: '',
      email: '',
    },
    jwtToken: '',
  },
  getters: {
    user: state => state.user,
    jwtToken: state => state.jwtToken,
    isAuthenticated: state => !isEqual(state.jwtToken, ''),
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateToken(state, token) {
      state.jwtToken = token;
    },
  },
  actions: {
    async login({ state, commit, dispatch }, { username, password }) {
      const response = await ApiService.doPost('/authenticate', { username, password });
      if (response.jwtToken) {
        commit('updateToken', response.jwtToken);
        localStorage.setItem('user', state.jwtToken);
        dispatch('fetchUser');
        return true;
      }

      return false;
    },
    async fetchUser({ commit, state }) {
      const userInfo = await ApiService.doGet('/users/me');

      if (!isNil(userInfo)) {
        commit('updateUser', userInfo);
        console.log(state.user);
      }
    },
    logout({ dispatch }) {
      localStorage.removeItem('user');
      dispatch('clearStore');
    },
    clearStore({ commit }) {
      const emptyStore = {
        user: {
          id: '',
          username: '',
          isAdmin: '',
        },
        jwtToken: '',
      };
      commit('updateUser', emptyStore.user);
      commit('updateToken', emptyStore.jwtToken);
    },
  },
};

export default UserStore;
