const SnackbarStore = {
  state: {
    snack: 'test',
  },
  getters: {
    snack: state => state.snack,
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    },
  },
};

export default SnackbarStore;
