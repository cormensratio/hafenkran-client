import Vuex from 'vuex';
import ExperimentStore from '@/store/ExperimentStore';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    example: ExperimentStore,
  },
});
