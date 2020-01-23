<template>
  <v-card>
    <v-card-text class="title">Share {{experiment.name}} with other Users</v-card-text>
    <v-card-text>
      <div>
        <div>
          <v-combobox outline multiple
                      v-model="selectedUsers"
                      label="Possible users"
                      :items="usersToShare"
                      :item-text="getItemText"
          >
            <template slot="selection" slot-scope="data">
              <v-chip :small="true" v-if="data.item">{{data.item.name}}</v-chip>
            </template>
            <template slot="append">
              <v-icon @click="clearSelected">close</v-icon>
            </template>
          </v-combobox>
          <v-btn style="background: var(--themeColor); color: white;"
                 @click="share"
          >
            Share
          </v-btn>
        </div>
        <div v-if="experiment.permittedUsers && experiment.permittedUsers.length > 0">
          <v-divider></v-divider>
          <div class="list-title">Already shared with:</div>
          <v-list class="permitted-user-list">
            <v-list-tile class="p-2 tile"
                         :key="user.name"
                         v-for="(user) in experiment.permittedUsers">
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
                <v-btn icon @click="deny(user)">
                  <v-icon color="red">close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { filter, some } from 'lodash';
import UsersMixin from '../../mixins/UsersMixin';

export default {
  name: 'ShareMenu',
  mixins: [UsersMixin],
  data() {
    return {
      selectedUsers: null,
    };
  },
  props: {
    experiment: {},
  },
  computed: {
    /**
     * Returns users that are not the user himself and that dont have permission to the experiment
     * @returns {Array}
     */
    usersToShare() {
      return filter(this.userList, user => user.id !== this.user.id
          && !some(this.experiment.permittedUsers, u => u.id === user.id));
    },
  },
  methods: {
    ...mapMutations(['setSnack']),
    ...mapActions(['triggerSnack', 'shareExperiment']),
    getItemText(item) {
      return item.name;
    },
    clearSelected() {
      this.selectedUsers = [];
    },
    share() {
      this.$emit('menuClosed');
    },
    deny(user) {
    },
  },
};
</script>

<style scoped>
  .tile:hover {
    background-color: #dddddd;
  }
  .permitted-user-list {
    overflow-y: scroll;
    max-height: 40vh;
  }
  .permitted-user-list::-webkit-scrollbar {
    display: none;
  }
  .list-title {
    font-size: 13pt;
  }
</style>
