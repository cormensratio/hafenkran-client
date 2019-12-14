import Vuex from 'vuex';
import Vue from 'vue';
import ExperimentStore from './ExperimentStore';
import UserStore from './UserStore';
import ExecutionStore from './ExecutionStore';
import SnackbarStore from './SnackbarStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    experiment: ExperimentStore,
    user: UserStore,
    execution: ExecutionStore,
    snackbar: SnackbarStore,
  },
});
