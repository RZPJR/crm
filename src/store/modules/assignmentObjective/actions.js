import http from "../../../services/http";

const actions = {
    // Readlist Sales Assignment
    fetchAssignmentObjectiveList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentObjectiveList', true);
        commit('setAssignmentObjectiveList', []);
        try {
            let search = state.assignment_objective_list.filter.search
            let status = state.assignment_objective_list.filter.status === 999 ? '' : "|status:"+state.assignment_list.filter.status      
            
            // const response = await http.get("/crm/assignment/objective", {
            //     params: {
            //         perpage:100,
            //         embeds:'created_by',
            //         conditions:'Or.name.icontains:'+search+'%2COr.code.icontains:'+search+status,
            //         orderby:'-id',
            //     }
            // });
            // if (response.data.data) commit('setAssignmentObjectiveList', response.data.data);
            commit('setPreloadAssignmentObjectiveList', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAssignmentObjectiveList', false);
        }
    },
    
    // Update Sales Assignment
    fetchAssignmentObjectiveUpdateDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentObjectiveUpdateDetail', true);
        commit('setAssignmentObjectiveList', {
            code: '',
            name: '',
            objective: '',
            survei_link: '',
        });
        try {
            let search = state.assignment_objective_list.filter.search
            let status = state.assignment_objective_list.filter.status === 999 ? '' : "|status:"+state.assignment_list.filter.status      
            
            // const response = await http.get("/crm/assignment/objective" + this.$route.params.id);
            // if (response.data.data) {
            //     commit('setAssignmentObjectiveList', {
            //         code: response.data.data.code,
            //         name: response.data.data.name,
            //         objective: response.data.data.objective,
            //         survei_link: response.data.data.surveylink,
            //     });
            // }          
            commit('setPreloadAssignmentObjectiveUpdateDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAssignmentObjectiveUpdateDetail', false);
        }
    },
};

export default actions;
