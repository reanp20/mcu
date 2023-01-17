const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/work/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/work/${data.id}/`,
        data
      );
      response.data = data;
    },
    async delete({ commit },  data ) {
      const response = await this.$axios.$delete(
        `/work/${data.id}/`
      );
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          "/work/"
        );
        commit("SET_EVENT", response);
      },
      async work({ commit }, ) {
        const response = await this.$axios.$get(
          "/work-user/"
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  