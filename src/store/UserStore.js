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
    userList: [
      {
        id: '1',
        name: 'testuser',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '2',
        name: 'Jacky Chun',
        isAdmin: '',
        eMail: '',
      },
    ],
    pendingUsers: [
      {
        id: '3',
        name: 'Geralt',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '4',
        name: 'Mickey Mouse',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '5',
        name: 'Morty',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '6',
        name: 'Popeye',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '7',
        name: 'Sonic',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '8',
        name: 'Charlie',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '9',
        name: 'Pikachu',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '10',
        name: 'Yamchu',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '11',
        name: 'Dumbo',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '12',
        name: 'Angela',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '13',
        name: 'Merkel',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '14',
        name: 'A',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '15',
        name: 'B',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '16',
        name: 'C',
        isAdmin: '',
        eMail: '',
      },
      {
        id: '17',
        name: 'D',
        isAdmin: '',
        eMail: '',
      },
    ],
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
    acceptUser(state, user) {
      const newUser = user;
      newUser.id = state.userList.length;
      state.userList.push(newUser);
      state.pendingUsers.splice(state.pendingUsers.indexOf(user), 1);
    },
    denyUser(state, user) {
      state.pendingUsers.splice(state.pendingUsers.indexOf(user), 1);
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
      const response = await ApiService.doPost(`${serviceUrl}/users/update`, { id: user.id, password: 'a', newPassword: '', email: '', status: 'INACTIVE', isAdmin: '' });
      if (!isNil(response)) {
        dispatch('fetchUserList');
        return response;
      }
      return null;
    },
  },
};

export default UserStore;
