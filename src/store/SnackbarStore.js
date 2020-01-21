const SnackbarStore = {
  state: {
    snack: '',
    snackShow: false,
    timer: '',
    color: '',
  },
  getters: {
    snack: state => state.snack,
    snackShow: state => state.snackShow,
    color: state => state.color,
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    },
    showSnack(state, show) {
      state.snackShow = show;
    },
    setColor(state, color) {
      state.color = color;
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
        commit('setColor', 'black');
        commit('showSnack', false);
      }, 3000);
    },
  },
};

export default SnackbarStore;
