<template>
  <div class="all">
    <Header @navigationToggle="toggleNavbar()"></Header>
    <v-navigation-drawer absolute temporary v-model="showNavbar">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar color="blue" dark round>
            <span class="white--text headline">{{ user.name.charAt(0) }}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title> {{ user.name }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in items"
          v-if="isAuthenticated"
          :key="item.title"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <slot name="body"></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './Header';

export default {
  name: 'BasePage',
  components: { Header },

  data() {
    return {
      showNavbar: false,
      items: [
        { title: 'See Experiments', icon: 'storage', path: '/experimentlist' },
        { title: 'See Executions', icon: 'storage', path: '/executionlist' },
        { title: 'Upload Experiment', icon: 'add', path: '/newexperiment' },
        { title: 'Back to Homepage', icon: 'home', path: '/' },
      ],
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
  },
};
</script>

<style scoped>
  .all {
    margin-top: 10px;
  }
</style>
