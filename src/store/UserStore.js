import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const UserStore = {
  state: {
    user: {
      id: '',
      name: '',
      isAdmin: '',
      email: '',
    },
    jwtToken: '',
  },
  getters: {
    user: state => state.user,
    jwtToken: state => state.jwtToken,
    isAuthenticated: state => !isEqual(state.jwtToken, ''),
    holdsUserInfo: state => !isEqual(state.user, ''),
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
    async login({ state, commit, dispatch, getters }, { name, password }) {
      if (!getters.isAuthenticated) {
        const response = await ApiService.doPost(`${process.env.USER_SERVICE_URL}/authenticate`, { name, password });
        if (!isNil(response) && response.jwtToken) {
          console.log('Received Token from User-Service');
          commit('updateToken', response.jwtToken);
          localStorage.setItem('user', state.jwtToken);
          dispatch('fetchUser');
          return true;
        }
      }
      console.log('Failed to login!');
      return false;
    },
    async fetchUser({ commit }) {
      const userInfo = await ApiService.doGet(`${process.env.USER_SERVICE_URL}/users/me`);

      if (!isNil(userInfo)) {
        commit('updateUser', userInfo);
        console.log('Successfully fetched user information');
        return true;
      }

      return false;
    },
    logout({ dispatch }) {
      localStorage.removeItem('user');
      dispatch('clearStore');
      console.log('Logged out');
    },
    clearStore({ commit }) {
      const emptyStore = {
        user: {
          id: '',
          name: '',
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
