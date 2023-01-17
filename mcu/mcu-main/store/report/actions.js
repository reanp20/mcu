const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/report/",
        data
      );
      response.data = data;
    },
    async announcement_view({ commit },  data ) {
        const response = await this.$axios.$post(
          "/announcement-view/",
          {}
        );
        response.data = data;
      },
      async event_view({ commit },  data ) {
        const response = await this.$axios.$post(
          "/event-view/",
          {}
        );
        response.data = data;
      },
      async posting_view({ commit },  data ) {
        const response = await this.$axios.$post(
          "/posting-view/",
          {}
        );
        response.data = data;
      },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/report/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          "/report/"
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  