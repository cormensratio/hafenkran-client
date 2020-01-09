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
    acceptUser(state, user) {
      const newUser = user;
      newUser.id = state.userList.length;
      state.userList.push(newUser);
      state.pendingUsers.splice(state.pendingUsers.indexOf(user), 1);
    },
    denyUser(state, user) {
      state.pendingUsers.splice(state.pendingUsers.indexOf(user), 1);
    },
    deleteUser(state, user) {
      state.userList.splice(state.userList.indexOf(user), 1);
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
    acceptUser({ commit }, user) {
      commit('acceptUser', user);
    },
    deleteUser({ commit }, user) {
      commit('deleteUser', user);
    },
    denyUser({ commit }, user) {
      commit('denyUser', user);
    },
  },
};

export default UserStore;
