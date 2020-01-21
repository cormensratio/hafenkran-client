<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="pb-3">
            <v-card-title class="justify-center">
              <h2>Are you sure you want to delete {{ userToDeleteName }}?</h2>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn class="error" @click="deleteUserFromList(userToDelete)">
                <span>Yes, I want to delete {{ userToDeleteName }}</span>
              </v-btn>
              <v-btn @click="dialog = false">
            <span>
              No, I'm not sure
            </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-layout column>
          <v-flex class="flex">
            <v-card max-width="800"
                    class="mx-auto mb-3"
                    v-if="pendingUsers.length > 0">
              <v-toolbar dark style="background: var(--themeColor)" class="mb-1">
                <v-toolbar-title>
                  Pending users
                </v-toolbar-title>
              </v-toolbar>
              <div class="listPending">
                <v-list>
                  <v-list-tile class="p-2 tile"
                               :key="user.name"
                               v-for="(user) in pendingUsers">
                    <v-list-tile-avatar size="50" class="mr-2">
                      <v-avatar color="blue" size="50">
                        <span class="headline white--text">
                          {{ user.name.charAt(0).toUpperCase() }}
                        </span>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      {{ user.name }}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon @click="setAccepted(user, true)">
                        <v-icon style="color: limegreen">done</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-btn icon @click="setAccepted(user, false)">
                        <v-icon style="color: red">clear</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </div>
            </v-card>
            <v-card max-width="800" class="mx-auto">
              <base-list-header title="Userlist">
              </base-list-header>
              <v-data-table :headers="headers"
                            class="elevation-1 userList"
                            v-bind:style="{ maxHeight: userListHeight }"
                            search=""
                            :items="userList">
                <template v-slot:items="props">
                  <tr>
                    <td class="text-xs-left">
                      <v-avatar color="blue" size="50" class="mt-2 mb-2 mr-2 ml-n2">
                        <span class="headline white--text">
                          {{ props.item.name.charAt(0).toUpperCase() }}
                        </span>
                      </v-avatar>
                      {{ props.item.name }}
                    </td>
                    <td>
                      {{ props.item.email }}
                    </td>
                    <td class="text-xs-left">
                      <v-btn icon @click="selectUserToDelete(props.item)"
                             v-if="props.item.id !== currentUser.id">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <v-progress-circular
              indeterminate
              color="#106ee0"
              v-if="loading"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import Footer from '../baseComponents/Footer';
import Header from '../baseComponents/Header';
import BaseListHeader from '../baseComponents/BaseListHeader';

export default {
  name: 'UserListPage',
  components: { BaseListHeader, Header, Footer, BasePage },
  data() {
    return {
      loading: false,
      userListHeight: '',
      pendingUserListHeight: '',
      dialog: false,
      userToDelete: null,
      userToDeleteName: '',
      headers: [
        { text: 'Username', width: 400, sortable: true, value: 'name' },
        { text: 'Email', width: 300, sortable: true, value: 'email' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['userList', 'pendingUsers']),
    ...mapGetters({ currentUser: 'user' }),
  },
  methods: {
    ...mapMutations(['updateIsAccepted', 'setSnack', 'showSnack']),
    ...mapActions(['triggerSnack', 'deleteUser', 'denyUser', 'acceptUser', 'fetchUserList']),
    selectUserToDelete(user) {
      this.dialog = true;
      this.userToDelete = user;
      this.userToDeleteName = user.name;
    },
    setAccepted(user, choice) {
      if (choice === true) {
        this.acceptUser(user);
        this.setSnack(`${user.name} has been accepted`);
      } else {
        this.denyUser(user);
        this.setSnack(`${user.name} has been declined`);
      }
      this.triggerSnack();
    },
    async deleteUserFromList(user) {
      this.dialog = false;
      this.loading = true;
      const deletedUser = await this.deleteUser(user.id);
      if (!isNil(deletedUser)) {
        this.setSnack(`${user.name} has been deleted`);
      } else {
        this.setSnack(`${user.name} could not be deleted`);
      }
      this.loading = false;
      this.triggerSnack();
    },
    async created() {
      await this.fetchUserList();
      debugger;
    },
    // calculate remaining space for Userlist by subtracting other components'
    // height from the user's window height
    screenHeight() {
      let pendingUserListHeight;
      if (this.pendingUsers.length >= 3) {
        pendingUserListHeight = 120;
      } else if (this.pendingUsers.length >= 2) {
        pendingUserListHeight = 60;
      } else if (this.pendingUsers.length === 1) {
        pendingUserListHeight = 0;
      } else {
        pendingUserListHeight = -165;
      }
      this.userListHeight = `${window.innerHeight - 420 - pendingUserListHeight}px`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.screenHeight);
      this.screenHeight();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenHeight);
  },
};
</script>

<style scoped>
  .listPending {
    overflow-y: scroll;
    max-height: 200px;
  }
  .tile:hover {
    background-color: #dddddd;
  }
  .userList {
    overflow-y: auto;
  }
</style>
