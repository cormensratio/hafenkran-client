<template>
  <v-card>
    <v-card-text class="title">Share {{experiment.name}} with other Users</v-card-text>
    <v-card-text>
      <div>
        <div>
          <v-combobox outline multiple
                      v-model="selectedUsers"
                      label="Possible users to share with"
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
                 :disabled="this.selectedUsers.length === 0"
          >
            Share
          </v-btn>
        </div>
        <div v-if="permittedUserWasRemoved || alreadyPermittedUsers.length > 0">
          <v-divider></v-divider>
        </div>
        <div v-if="alreadyPermittedUsers.length > 0">
          <div class="list-title">Already shared with:</div>
          <v-list class="permitted-user-list">
            <v-list-tile class="p-2 tile"
                         :key="user"
                         v-for="(user) in alreadyPermittedUsers">
              <v-list-tile-avatar size="50" class="mr-2">
                <v-avatar color="blue" size="50">
                        <span class="headline white--text">
                          {{ getUserNameFromId(user).charAt(0).toUpperCase() }}
                        </span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                {{ getUserNameFromId(user) }}
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="removeUserPermission(user)">
                  <v-icon color="red">close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </div>
        <v-btn @click="saveRemovedUsers"
               style="background: var(--themeColor); color: white;"
               v-if="permittedUserWasRemoved"
        >
          Save removed users
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { filter, some, isNil, map, isEqual } from 'lodash';
import UsersMixin from '../../mixins/UsersMixin';

export default {
  name: 'ShareMenu',
  mixins: [UsersMixin],
  data() {
    return {
      permittedUserWasRemoved: false,
      selectedUsers: [],
      alreadyPermittedUsers: [],
    };
  },
  props: {
    experiment: {},
  },
  computed: {
    /**
     * Returns users, that are not the user himself and that dont have permission to the experiment
     * @returns {Array}
     */
    usersToShare() {
      return filter(this.userList, user => user.id !== this.user.id
          && !some(this.alreadyPermittedUsers, id => id === user.id));
    },
  },
  methods: {
    ...mapMutations(['setSnack']),
    ...mapActions(['triggerSnack', 'updatePermittedUsers', 'fetchExperiments']),
    getItemText(item) {
      return item.name;
    },
    clearSelected() {
      this.selectedUsers = [];
    },
    async share() {
      if (this.selectedUsers.length > 0) {
        const success = await this.updatePermissions(map(this.selectedUsers, u => u.id));
        if (success) {
          this.setSnack('Successfully shared experiment');
          this.triggerSnack();
        }
        this.$emit('menuClosed');
      }
    },
    async updatePermissions(permittedUsers) {
      const successful = await this.updatePermittedUsers(
        { experimentId: this.experiment.id, permittedUsers },
      );

      if (successful) {
        await this.fetchExperiments();
      }
      return successful;
    },
    async saveRemovedUsers() {
      const success = await this.updatePermissions(this.alreadyPermittedUsers);

      if (success) {
        this.permittedUserWasRemoved = false;
        this.setSnack('Successfully removed permissions from selected users');
        this.triggerSnack();
      }
    },
    removeUserPermission(userId) {
      this.alreadyPermittedUsers = filter(this.alreadyPermittedUsers, id => id !== userId);
      this.permittedUserWasRemoved = true;
    },
  },
  created() {
    if (!isNil(this.experiment.permittedUsers)) {
      this.alreadyPermittedUsers = filter(this.experiment.permittedUsers,
        id => !isEqual(id, this.user.id));
    }
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
