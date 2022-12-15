const mutations = {
    // Readlist Sales Assignment
    setPreloadAssignmentObjectiveList: function(state, payload) {
        state.assignment_objective_list.isLoading = payload;
    return state;
    },
    setAssignmentObjectiveList: function(state, payload) {
        state.assignment_objective_list.data = payload;
        return state;
    },
};

export default mutations;
