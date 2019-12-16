import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual } from 'lodash';
import ApiService from '../service/ApiService';
import AuthService from '../service/AuthService';
import UserSettingsPage from '../components/views/UserSettingsPage';

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
        id: 'test',
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
      const userList = await ApiService.doGet(`${serviceUrl}/users/all`);

      if (!isNil(userList)) {
        commit('updateUserList', userList);
        return true;
      }
      return false;
    },
    async updateUser({ commit, state }, { email, password, isAdmin }) {
      const newUserInformation = {
        id: state.user.id,
        password,
        email,
        isAdmin,
      };
      const updatedUser = await ApiService.doPost(`${process.env.USER_SERVICE_URL}/users/update`, newUserInformation);

      if (!isNil(updatedUser)) {
        commit('updateUser', updatedUser);
        console.log('Successfully updated user information.');
        return updatedUser;
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
