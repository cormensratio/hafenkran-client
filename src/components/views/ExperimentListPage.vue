<template>
  <base-page>
      <template slot="body">
        <div class="container">
          <div>
            <v-data-table
              :headers="headers"
              :items="experiments"
              :expand="expand"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
              <td class="text-xs-left">{{ props.item.size }}</td>
              </tr>
            </template>
              <template v-slot:expand="props">
                <DropdownMenuVcard :expId="props.item.id"></DropdownMenuVcard>
              </template>
            </v-data-table>
          </div>
          <div>
            <v-btn :to="'/newexperiment'"> Upload File </v-btn>
          </div>
        </div>
      </template>
  </base-page>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import DropdownMenuVcard from '../baseComponents/DropdownMenuVcard';


export default {
  name: 'ExperimentListPage',
  components: { DropdownMenuVcard, BasePage },

  computed: {
    ...mapGetters(['experiments']),
  },
  data() {
    return {
      message: '',
      expand: true,
      headers: [
        {
          text: 'Dockerfile Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Uploaded', value: 'uploadDate', sortable: true },
        { text: 'Size', value: 'size', sortable: true },
      ],
    };
  },
  methods: {
    ...mapActions(['fetchExperiments']),
    getTimeStamp(utcTime) {
      return moment(utcTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>

</style>
