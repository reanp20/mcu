const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/job_posting/",
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
        `/job_posting/${data.id}/`,
      );
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/job_posting/${data.get('id')}/`,
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
          "/job_posting/"
        );
        commit("SET_EVENT", response);
      },
      async notify({ commit }, data) {
        const response = await this.$axios.$post(
          "/notify/",
          data
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  