const mutations = {
    // Readlist Sales Assignment
    setPreloadAssignmentList: function(state, payload) {
        state.assignment_list.isLoading = payload;
    return state;
    },
    setAssignmentList: function(state, payload) {
        state.assignment_list.data = payload;
        return state;
    },

    // Create Sales Assignment
    setPreloadCreateAssignment: function(state, payload) {
        state.create_assignment.isLoading = payload;
        return state;
    },
    setCreateAssignment: function(state, payload) {
        state.create_assignment.data = payload;
        return state;
    },
    setCreateAssignmentError: function(state, payload) {
        state.create_assignment.error = payload;
        return state;
    },
    setCreateAssignmentErrorDetail: function(state, payload) {
        state.create_assignment.error_detail = payload;
        return state;
    },
    setCreateAssignmentClear: function(state, payload) {
        state.create_assignment.clear = payload;
        return state;
    },
    setCreateAssignmentSuccess: function(state, payload) {
        state.create_assignment.success = payload;
        return state;
    },

    // Detail Sales Assignment
    setPreloadDetailAssignment: function(state, payload) {
        state.detail_assignment.isLoading = payload;
        return state;
    },
    setDetailAssignment: function(state, payload) {
        state.detail_assignment.data = payload;
        return state;
    },
};

export default mutations;
