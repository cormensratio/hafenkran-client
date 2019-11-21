import Vuex from 'vuex';
import Vue from 'vue';
import ExperimentStore from './ExperimentStore';
import UserStore from './UserStore';
import ExecutionStore from './ExecutionStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    example: ExperimentStore,
    user: UserStore,
    execution: ExecutionStore,
  },
});
