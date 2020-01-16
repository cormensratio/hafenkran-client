<template>
  <base-page>
    <template slot="body">
      <v-container class="top">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <h2>Are you sure you want to delete {{ userToDeleteName }}?</h2>
            </v-card-title>
            <v-card-actions>
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
          <v-flex>
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
              <v-toolbar dark style="background: var(--themeColor)" class="mb-1">
                <v-toolbar-title>
                  Users
                </v-toolbar-title>
              </v-toolbar>
              <div mb-5>
                <v-list class="listAccepted" v-bind:style="{ maxHeight: maxHeight }">
                  <v-list-tile class="p-2 tile"
                               :key="user.name"
                               v-for="(user) in userList">
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
                      <v-btn icon @click="selectUserToDelete(user)"
                             v-if="user.id !== currentUser.id">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </div>
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

export default {
  name: 'UserListPage',
  components: { Header, Footer, BasePage },
  data() {
    return {
      loading: false,
      dialog: false,
      userToDelete: null,
      userToDeleteName: '',
    };
  },
  computed: {
    ...mapGetters(['userList', 'pendingUsers']),
    ...mapGetters({ currentUser: 'user' }),
    maxHeight() {
      if (this.pendingUsers.length >= 2) {
        return '39vh';
      } else if (this.pendingUsers.length === 1) {
        return '51vh';
      }
      return '69vh';
    },
  },
  methods: {
    ...mapMutations(['updateIsAccepted', 'setSnack', 'showSnack']),
    ...mapActions(['triggerSnack', 'deleteUser', 'denyUser', 'acceptUser']),
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
  },
};
</script>

<style scoped>
  .listAccepted {
    overflow-y: scroll;
  }

  .listPending {
    overflow-y: scroll;
    max-height: 200px;
  }

  .tile:hover {
    background-color: #dddddd;
  }
</style>
