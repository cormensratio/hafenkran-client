import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
import ApiService from '../service/ApiService';
import AuthService from '../service/AuthService';

Vue.use(Vuex);

const UserStore = {
  state: {
    user: {
      id: '',
      name: '',
      password: '',
      isAdmin: '',
      email: '',
    },
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => !isEqual(state.user.name, '')
        && !isNil(localStorage.getItem('user')),
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ dispatch, getters }, { name, password }) {
      if (!getters.isAuthenticated) {
        const success = await AuthService.login(name, password);
        if (success) {
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
      AuthService.logout();
      dispatch('clearStore');
      console.log('Logged out');
    },
    clearStore({ commit }) {
      const emptyStore = {
        user: {
          id: '',
          name: '',
          password: '',
          isAdmin: '',
        },
      };

      commit('updateUser', emptyStore.user);
    },
  },
};

export default UserStore;
