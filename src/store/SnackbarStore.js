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
    triggerSnack(context) {
      context.commit('showSnack', true);
      setTimeout(() => {
        context.commit('showSnack', false);
      }, 2500);
    },
  },
};

export default SnackbarStore;
