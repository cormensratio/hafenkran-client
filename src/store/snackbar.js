export const state = () => ({
  snack: 'test',
});

export const mutations = {
  setSnack(snack) {
    state.snack = snack;
  },
  getters: {
    experiments: state.snack,
  },
};
