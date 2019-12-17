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
    hideSnack(state) {
      state.snackShow = false;
    },
    showSnack(state) {
      state.snackShow = true;
    },
  },
  actions: {
    triggerSnack(context) {
      context.commit('showSnack');
      setTimeout(() => {
        context.commit('hideSnack');
      }, 2500);
    },
  },
};

export default SnackbarStore;
