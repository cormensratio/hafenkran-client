import Vuex from 'vuex';
import Vue from 'vue';
import ExperimentStore from './ExperimentStore';
import UserStore from './UserStore';
import ExecutionStore from './ExecutionStore';
import ResultStore from './ResultStore';
import SnackbarStore from './SnackbarStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    experiment: ExperimentStore,
    user: UserStore,
    execution: ExecutionStore,
    result: ResultStore,
    snackbar: SnackbarStore,
  },
});
