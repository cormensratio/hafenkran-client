import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
import ApiService from '../service/ApiService';

Vue.use(Vuex);

const UserStore = {
  state: {
    user: {
      id: '',
      username: 'hallo',
      isAdmin: '',
      email: '',
    },
    jwtToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhNDYwNDVkZS1iOGZmLTQwNDQtYjI4Yi1iYmExMGI5MDg2YWIiLCJleHAiOjE1Nzg4NTkwMjEsInVzZXIiOnsiaWQiOiJhNDYwNDVkZS1iOGZmLTQwNDQtYjI4Yi1iYmExMGI5MDg2YWIiLCJ1c2VybmFtZSI6IlJpY2siLCJlbWFpbCI6IiIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTczNjc1MDIxfQ.feFhLvP7xsHgM76s1KmsUQ_1mU1JDRq6MY58L5e_iiDIr2UlAD2pt5HtuYecRj_xbF84s7o-IT24e_nW3M8hSg',
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
    async fetchUser({ commit, state }) {
      const userInfo = await ApiService.doGet(`${process.env.USER_SERVICE_URL}/users/me`);

      if (!isNil(userInfo)) {
        commit('updateUser', userInfo);
        console.log(state.user);
      }
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
