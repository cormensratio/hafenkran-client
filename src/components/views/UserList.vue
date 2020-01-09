<template>
  <base-page>
    <template slot="body">
      <v-container class="top">
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
                <v-list class="listAccepted">
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
                      <v-btn icon @click="deleteUserFromList(user)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import Footer from '../baseComponents/Footer';
import Header from '../baseComponents/Header';

export default {
  name: 'UserList',
  components: { Header, Footer, BasePage },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userList', 'pendingUsers']),
  },
  methods: {
    ...mapMutations(['updateIsAccepted', 'setSnack', 'showSnack']),
    ...mapActions(['triggerSnack', 'deleteUser', 'denyUser', 'acceptUser']),
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
    deleteUserFromList(user) {
      this.deleteUser(user);
      this.setSnack(`${user.name} has been deleted`);
      this.triggerSnack();
    },
  },
};
</script>

<style scoped>
  .listAccepted {
    overflow-y: scroll;
    max-height: 500px;
  }
  .listPending {
    overflow-y: scroll;
    max-height: 300px;
  }
  .tile:hover {
    background-color: #dddddd;
  }
</style>
