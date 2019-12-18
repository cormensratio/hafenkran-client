const SnackbarStore = {
  state: {
    snack: '',
    snackShow: false,
  },
  getters: {
    snack: state => state.snack,
    snackShow: state => state.snackShow,
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    },
    showSnack(state, show) {
      state.snackShow = show;
    },
  },
  actions: {
    triggerSnack({ commit }) {
      commit('showSnack', true);
      setTimeout(() => {
        commit('setSnack', '');
        commit('showSnack', false);
      }, 2500);
    },
  },
};

export default SnackbarStore;
