const actions = {
  async add({ commit },  data ) {
    const response = await this.$axios.$post(
      "/reset/",
      data
    );
    response.data = data;
  },
  async edit({ commit },  data ) {
    const response = await this.$axios.$put(
      `/reset/${data.id}/`,
      data
    );
    response.data = data;
  },
  async view({ commit }, ) {
      const response = await this.$axios.$get(
        "/reset/"
      );
      commit("SET_EVENT", response);
    },
};

export default actions;
