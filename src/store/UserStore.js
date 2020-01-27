import Vue from 'vue';
import Vuex from 'vuex';
import { isNil, isEqual, filter } from 'lodash';
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
    userList: [],
    pendingUsers: [],
  },
  getters: {
    user: state => state.user,
    userList: state => state.userList,
    pendingUsers: state => state.pendingUsers,
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
    updatePendingUserList(state, userList) {
      state.pendingUsers = userList;
    },
  },
  actions: {
    async login({ dispatch, getters }, { name, password }) {
      if (!getters.isAuthenticated) {
        const success = await AuthService.login(name, password);
        if (success) {
          dispatch('fetchUser');
          // if (dispatch('fetchUser')) {
          //   dispatch('fetchUserList');
          // }
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
      const rawUserList = await ApiService.doGet(`${serviceUrl}/users`);
      let userList;
      let pendingUserList;
      if (!isNil(rawUserList)) {
        userList = filter(rawUserList, user => user.status === 'ACTIVE');
        pendingUserList = filter(rawUserList, user => user.status === 'INACTIVE');

        commit('updatePendingUserList', pendingUserList);
        commit('updateUserList', userList);
        return true;
      }
      return false;
    },
    async registerUser({ getters }, { username, password, email, isAdmin }) {
      if (!getters.isAuthenticated) {
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
    async updateUser({ commit, state }, { email, password, newPassword, isAdmin }) {
      const newUserInformation = {
        id: state.user.id,
        password,
        email,
        newPassword,
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
    async acceptUser({ dispatch }, user) {
      const response = await ApiService.doPost(`${serviceUrl}/users/update`, { id: user.id, password: 'a', newPassword: '', email: '', status: 'ACTIVE', isAdmin: '' });
      if (!isNil(response)) {
        dispatch('fetchUserList');
        return response;
      }
      return null;
    },
    async deleteUser({ dispatch }, id) {
      const response = await ApiService.doPost(`${serviceUrl}/users/delete/${id}`);
      console.log(response);
      if (!isNil(response)) {
        dispatch('fetchUserList');
        return response;
      }
      return null;
    },
    async denyUser({ dispatch }, user) {
      const response = await ApiService.doPost(`${serviceUrl}/users/delete/${user.id}`);
      if (!isNil(response)) {
        dispatch('fetchUserList');
        return response;
      }
      return null;
    },
  },
};

export default UserStore;
