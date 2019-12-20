import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
import ApiService from '../service/ApiService';
import AuthService from '../service/AuthService';

Vue.use(Vuex);

export const serviceUrl = process.env.USER_SERVICE_URL;

const UserStore = {
  state: {
    user: {
      id: '',
      name: '',
      isAdmin: '',
      email: '',
    },
    userList: [
      {
        id: '1',
        name: 'testuser',
        isAdmin: '',
        eMail: '',
      },
    ],
  },
  getters: {
    user: state => state.user,
    userList: state => state.userList,
    isAuthenticated: state => !isEqual(state.user.name, '')
      && !isNil(localStorage.getItem('user')),
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateUserList(state, userList) {
      state.userList = userList;
    },
  },
  actions: {
    async login({ dispatch, getters }, { name, password }) {
      if (!getters.isAuthenticated) {
        const success = await AuthService.login(name, password);
        if (success) {
          if (dispatch('fetchUser')) {
            dispatch('fetchUserList');
          }
          return true;
        }
      }
      console.log('Failed to login!');
      return false;
    },
    async fetchUser({ commit }) {
      const userInfo = await ApiService.doGet(`${serviceUrl}/users/me`);

      if (!isNil(userInfo)) {
        commit('updateUser', userInfo);
        console.log('Successfully fetched user information');
        return true;
      }
      return false;
    },
    async fetchUserList({ commit }) {
      const userList = await ApiService.doGet(`${serviceUrl}/users`);

      if (!isNil(userList)) {
        commit('updateUserList', userList);
        return true;
      }
      return false;
    },
    async registerUser({ getters }, { username, password, email, isAdmin }) {
      if (getters.isAuthenticated) {
        if (!isNil(username) && !isNil(password) && !isNil(email) && !isNil(isAdmin)) {
          const response = await ApiService.doPost(`${serviceUrl}/users/create`,
            { name: username, password, email, isAdmin });

          if (!isNil(response)) {
            return response;
          }
        }
      }
      return null;
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
          isAdmin: '',
        },
      };

      commit('updateUser', emptyStore.user);
    },
  },
};

export default UserStore;
