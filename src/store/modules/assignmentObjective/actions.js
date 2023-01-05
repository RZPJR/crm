import http from "../../../services/http";

const actions = {
    // Readlist Sales Assignment
    fetchAssignmentObjectiveList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentObjectiveList', true);
        commit('setAssignmentObjectiveList', []);
        try {
            let search = state.assignment_objective_list.filter.search
            let status = state.assignment_objective_list.filter.status === 999 ? '' : state.assignment_objective_list.filter.status      
            
            const response = await http.get("/sales/assignment/objective", {
                params: {
                    per_page:1000,
                    order_by:'-id',
                    status: status,
                    search: search
                }
            });
            if (response.data.data) commit('setAssignmentObjectiveList', response.data.data);
            commit('setPreloadAssignmentObjectiveList', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAssignmentObjectiveList', false);
        }
    },
    
    // Update Sales Assignment
    fetchAssignmentObjectiveUpdateDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentObjectiveUpdateDetail', true);
        commit('setAssignmentObjectiveUpdateDetail', {
            code: '',
            name: '',
            objective: '',
            survei_link: '',
        });
        try {  
            const response = await http.get("/sales/assignment/objective/" + payload.id);
            if (response.data.data) {
                commit('setAssignmentObjectiveUpdateDetail', {
                    code: response.data.data.code,
                    name: response.data.data.name,
                    objective: response.data.data.objective,
                    survey_link: response.data.data.survey_link,
                });
            }          
            commit('setPreloadAssignmentObjectiveUpdateDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAssignmentObjectiveUpdateDetail', false);
        }
    },
};

export default actions;
