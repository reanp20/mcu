const mutations = {
    ADD_USER: (state, payload) => {
      state.customers.unshift(payload);
    },
    SET_EVENT: (state, payload) => {
      state.users=payload
    },
  };
  
  export default mutations;
  