const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/announcement/",
        data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
      response.data = data;
    },
    async delete({ commit },  data ) {
      const response = await this.$axios.$delete(
        `/announcement/${data.id}/`,
      );
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/announcement/${data.get('id')}/`,
        data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
      response.data = data;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          "/announcement/"
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  