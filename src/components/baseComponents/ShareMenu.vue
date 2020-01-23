<template>
  <v-card>
    <v-card-text class="title">Share {{experiment.name}} with other Users</v-card-text>
    <v-card-text>
      <div>
        <div>
          <v-combobox outline small-chips
                      v-model="selectedUsers"
          ></v-combobox>
          <v-btn style="background: var(--themeColor); color: white;"
                 @click="share"
          >
            Share
          </v-btn>
        </div>
        <div v-if="experiment.permittedUsers && experiment.permittedUsers.length > 0">
          <v-divider></v-divider>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Already shared with:</v-list-tile-title>
            </v-list-tile>
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
import UsersMixin from '../../mixins/UsersMixin';

export default {
  name: 'ShareMenu',
  mixins: [UsersMixin],
  data() {
    return {
      selectedUsers: [],
      usersToShare: [],
    };
  },
  props: {
    experiment: {},
  },
  methods: {
    ...mapMutations(['setSnack']),
    ...mapActions(['triggerSnack', 'shareExperiment']),
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
</style>
