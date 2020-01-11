const SnackbarStore = {
  state: {
    snack: '',
    snackShow: false,
    timer: '',
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
      if (this.timer !== '') {
        clearTimeout(this.timer);
      }
      commit('showSnack', true);
      this.timer = setTimeout(() => {
        commit('setSnack', '');
        commit('showSnack', false);
      }, 3000);
    },
  },
};

export default SnackbarStore;
