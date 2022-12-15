const mutations = {
  setPreloadAssignmentList: function(state, payload) {
    state.assignment_list.isLoading = payload;
    return state;
  },
  setAssignmentList: function(state, payload) {
    state.assignment_list.data = payload;
    return state;
  },
};

export default mutations;
