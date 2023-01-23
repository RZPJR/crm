import http from "../../../services/http";

const actions = {
    // Readlist Customer Acquisition
    fetchAssignmentSubmission: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadSubmission', true);
        commit('setOverlaySubmission', true);
        commit('setSubmission', []);
        try {
            let territory_id = ''
            if(state.assignment_submission.sales_group_id){
                territory_id = state.assignment_submission.sales_group_id
            }
            let submittedDate1 = ''
            let submittedDate2 = ''
            if (state.assignment_submission.submitted_date.length > 0) {
                if (state.assignment_submission.submitted_date.length == 1) {
                        submittedDate1 = state.assignment_submission.submitted_date[0]+'T00:00:00Z'
                        submittedDate2 = state.assignment_submission.submitted_date[0]+'T23:59:59Z'
                } else {
                    let date = state.assignment_submission.submitted_date[0]
                    let date2 = state.assignment_submission.submitted_date[1]
                    if (date > date2) {
                        submittedDate1 = date2+'T00:00:00Z'
                        submittedDate2 = date+'T23:59:59Z'
                    } else {
                        submittedDate1 = date+'T00:00:00Z'
                        submittedDate2 = date2+'T23:59:59Z'
                    }
                }
            }
            let taskType = ''
            if(state.assignment_submission.task_type){
                taskType = state.assignment_submission.task_type
            }
            let status = ''
            if(state.assignment_submission.statuses === 999){
                status = ''
            }else{
                status= state.assignment_submission.statuses
            }
            let oor = ''
            if(state.assignment_submission.out_of_route === 999){
                oor = ''
            }else{
                oor = state.assignment_submission.out_of_route 
            }
            const response = await http.get("/sales/assignment/submission", {
                params: {
                    perpage: 100,
                    task: taskType,
                    orderby: '-submit_date',
                    status: status,
                    submit_date_start: submittedDate1,
                    submit_date_end: submittedDate2,
                    territory_id: territory_id,
                    out_of_route: oor,
                }
            });
            if (response.data.data) commit('setSubmission', response.data.data);
            commit('setPreloadSubmission', false);
            commit('setOverlaySubmission', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadSubmission', false);
            commit('setOverlaySubmission', false);
        }
    },
};

export default actions;
