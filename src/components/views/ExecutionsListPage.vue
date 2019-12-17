<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <v-toolbar style="background: var(--themeColor)" dark>
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
                       @click="executionCancel(props.item.id)">Cancel</v-btn>
                <v-dialog
                  v-model="dialog"
                  width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="props.item.status === 'RUNNING'
                    || props.item.status === 'WAITING'" disabled>
                      Delete
                    </v-btn>
                    <v-btn v-else color="red lighten-2" dark v-on="on">
                      Delete
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Are you sure you want to delete this Execution?
                    </v-card-title>
                    <v-card-actions>
                      <v-btn class="error"
                             @click="executionDelete(props.item.id), dialog = false">
                        Yes, I want to delete</v-btn>
                      <v-btn @click="dialog = false">No, I'm not sure</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-progress-circular
          size="50"
          indeterminate
          color="#106ee0"
          v-if="loading"
        />
        <v-snackbar v-model="snackShow" top>
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil, isEqual } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';


export default {
  name: 'ExecutionsListPage',
  components: { StatusCell, BasePage },
  mixins: [TimeStampMixin],
  data() {
    return {
      search: '',
      loading: false,
      dialog: false,
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
    ...mapGetters(['executions', 'snack', 'snackShow']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution', 'triggerSnack']),
    ...mapMutations(['setSnack']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    async executionCancel(id) {
      this.loading = true;
      const canceledExecution = await this.terminateExecution(id);
      this.loading = false;
      if (canceledExecution !== null) {
        this.setSnack(`${canceledExecution.name} has been canceled`);
        this.triggerSnack();
      }
      this.setSnack('Execution could not be canceled');
      this.triggerSnack();
    },
    async executionDelete(id) {
      this.loading = true;
      const deletedExecution = await this.deleteExecution(id);
      this.loading = false;
      if (deletedExecution !== null) {
        this.setSnack(`${deletedExecution.name} has been deleted`);
        this.triggerSnack();
      }
      this.setSnack('Execution could not be deleted');
      this.triggerSnack();
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
