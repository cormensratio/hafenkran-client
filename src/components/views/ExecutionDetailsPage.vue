<template>
  <base-page>
    <template slot="body">
      <div>

      </div>
      <div>

      </div>
    </template>
  </base-page>
</template>

<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import BasePage from '../baseComponents/BasePage';


export default {
  name: 'ExecutionDetailsPage',
  components: { BasePage },
  data() {
    return {
      execution: {},
    };
  },
  props: {
    executionId: String,
  },
  methods: {
    ...mapActions(['getExecutionById']),
  },
  created() {
    this.getExecutionById(this.executionId).then((execution) => {
      if (!isNil(execution)) {
        this.execution = execution;
      }
    });
  },
};
</script>

<style scoped>

</style>
