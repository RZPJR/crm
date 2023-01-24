const mutations = {
    // Readlist 
    setPreloadSubmission: function(state, payload) {
        state.assignment_submission.loading = payload;
    return state;
    },
    setOverlaySubmission: function(state, payload) {
        state.assignment_submission.overlay = payload;
    return state;
    },
    setSubmission: function(state, payload) {
        state.assignment_submission.items = payload;
        return state;
    },
};

export default mutations;
