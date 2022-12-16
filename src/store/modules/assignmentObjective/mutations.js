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
    
    // Update Sales Assignment
    setPreloadAssignmentObjectiveUpdateDetail: function(state, payload) {
        state.update_assignment_objective_list.isLoading = payload;
    return state;
    },
    setAssignmentObjectiveUpdateDetail: function(state, payload) {
        state.update_assignment_objective_list.form = payload;
        return state;
    },
};

export default mutations;
