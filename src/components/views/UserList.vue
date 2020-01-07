<template>
  <base-page>
    <template slot="body">
      <v-container class="top">
        <v-layout column>
          <v-flex>
            <v-card max-width="800" class="mx-auto mb-5">
              <v-toolbar dark style="background: var(--themeColor)" class="mb-4">
                <v-toolbar-title>
                  Users (unaccepted)
                </v-toolbar-title>
              </v-toolbar>
              <v-list v-for="(user, index) in userList"
                      v-if="user.isAccepted === ''"
                      expand
                      :key="user.name">
                <v-list-tile class="mt-n2">
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
              <v-spacer/>
            </v-card>
            <v-card max-width="800" class="mx-auto">
              <v-toolbar dark style="background: var(--themeColor)" class="mb-4">
                <v-toolbar-title>
                  Users
                </v-toolbar-title>
              </v-toolbar>
              <v-list v-for="(user) in userList"
                      v-if="user.isAccepted"
                      :key="user.name" two-line>
                <v-list-tile class="mt-n2">
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
                </v-list-tile>
              </v-list>
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

</style>
