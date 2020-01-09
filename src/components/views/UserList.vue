<template>
  <base-page>
    <template slot="body">
      <v-container class="top">
        <v-layout column>
          <v-flex>
            <v-card max-width="800" class="mx-auto mb-3">
              <v-toolbar dark style="background: var(--themeColor)" class="mb-3">
                <v-toolbar-title>
                  Users (unaccepted)
                </v-toolbar-title>
              </v-toolbar>
              <div class="list">
                <v-list>
                  <v-list-tile class="m-2"
                               :key="user.name"
                               v-for="(user, index) in userList"
                               v-if="user.isAccepted === ''">
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
                    <v-list-tile-action v-if="user.isAccepted===''">
                      <v-btn icon @click="setAccepted(index, true)">
                        <v-icon style="color: limegreen">done</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-if="user.isAccepted===''">
                      <v-btn icon @click="setAccepted(index, false)">
                        <v-icon style="color: red">clear</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider/>
                </v-list>
              </div>
            </v-card>
            <v-card max-width="800" class="mx-auto">
              <v-toolbar dark style="background: var(--themeColor)" class="mb-3">
                <v-toolbar-title>
                  Users
                </v-toolbar-title>
              </v-toolbar>
              <div>
                <v-list class="list">
                  <v-list-tile class="m-2"
                               :key="user.name"
                               v-for="(user) in userList"
                               v-if="user.isAccepted">
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
                      <v-btn icon>
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
    ...mapGetters(['userList']),
  },
  methods: {
    ...mapMutations(['updateIsAccepted', 'setSnack', 'showSnack']),
    ...mapActions(['triggerSnack']),
    setAccepted(index, choice) {
      this.updateIsAccepted({ index, choice });
      if (choice === true) {
        this.setSnack(`${this.userList[index].name} has been accepted`);
      } else {
        this.setSnack(`${this.userList[index].name} has been declined`);
      }
      this.triggerSnack();
    },
  },
};
</script>

<style scoped>
  .list {
    overflow-y: scroll;
    max-height: 40vh;
  }
</style>
