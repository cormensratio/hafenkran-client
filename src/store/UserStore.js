import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
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
    jwtToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDIiLCJleHAiOjE1ODIwMzQzNDgsInVzZXIiOnsiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDIiLCJ1c2VybmFtZSI6IlJpY2siLCJlbWFpbCI6IiIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTc0MjU4MzQ4fQ.vg9L1U7mDpXAcqVArU059FYVbvPCWXSLGCo5VlPH7qFU-Arc1L4AF8hrAcjGCPtPbwgZJhT6p-EL58H2E3-2-A',
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
    async login({ state, commit, dispatch, getters }, { username, password }) {
      if (!getters.isAuthenticated) {
        const response = await ApiService.doPost(`${process.env.USER_SERVICE_URL}/authenticate`, { username, password });
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
