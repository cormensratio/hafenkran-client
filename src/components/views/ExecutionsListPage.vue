<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <v-toolbar color="blue" dark>
            <span class="title"> Executions </span>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search"
                          label="Search"
                          single-line
                          v-model="search"
            >
            </v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="executions"
            :search="search"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.createdAt) || 'Not started yet' }}
              </td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.terminatedAt) || 'Not terminated yet'}}
              </td>
              <td class="text-xs-left">
                <status-cell :status="props.item.status"></status-cell>
              </td>
              <td class="text-xs-left">
                <v-btn @click="navigateToDetails(props.item.id)">Details</v-btn>
                <v-btn :disabled="cancelButtonDisabled(props.item.status)"
                       @click="terminateExecution(props.item.id), showSnackbar=!showSnackbar">
                  Cancel</v-btn>
                <v-btn @click="deleteExecution(props.item.id)">Delete</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-btn @click="showSnackbar=!showSnackbar">Click</v-btn>
        <v-snackbar timeout="3000" v-model="showSnackbar">
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil, isEqual } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';


export default {
  name: 'ExecutionsListPage',
  components: { StatusCell, BasePage },
  mixins: [timeStampMixin],
  data() {
    return {
      search: '',
      showSnackbar: false,
      headers: [
        { text: 'Experiment', sortable: true, value: 'name' },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions', 'snack']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    cancelButtonDisabled(status) {
      let disabled = true;
      if (!isNil(status)) {
        if (!isEqual(status, 'RUNNING')) {
          disabled = false;
        } else if (!isEqual(status, 'WAITING')) {
          disabled = false;
        }
      }
      return disabled;
    },
  },
  created() {
    this.fetchAllExecutionsOfUser();
  },
};
</script>

<style scoped>
.title {
  font-size: 14pt;
}
</style>
