import Vuex from 'vuex';
import Vue from 'vue';
import ExperimentStore from './ExperimentStore';
import UserStore from './UserStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    example: ExperimentStore,
    user: UserStore,
  },
});
