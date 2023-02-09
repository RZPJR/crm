import http from "../../../services/http";
import Vue from 'vue'
import router from '../../../router/index'

const actions = {
    // Readlist Sales Assignment
    fetchAssignmentList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentList', true);
        commit('setAssignmentList', []);
        try {
            let status = state.assignment_list.filter.status === 999 ? '' : state.assignment_list.filter.status      
            let sales_group = state.assignment_list.filter.sales_group_id === '' ? '' : state.assignment_list.filter.sales_group_id
            let start_date1 = ''
            let start_date2 = ''
            if (state.assignment_list.filter.start_date.value.length > 0) {
                if (state.assignment_list.filter.start_date.value.length == 1) {
                start_date1 = state.assignment_list.filter.start_date.value[0]
                } else {
                    let date = state.assignment_list.filter.start_date.value[0]
                    let date2 = state.assignment_list.filter.start_date.value[1]
                    if (date > date2) {
                        start_date1 = date2
                        start_date2 = date
                    } else {
                        start_date1 = date
                        start_date2 = date2
                    }
                }
            }
            let end_date1 = ''
            let end_date2 = ''
            if (state.assignment_list.filter.end_date.value.length > 0) {
                if (state.assignment_list.filter.end_date.value.length == 1) {
                end_date1 = state.assignment_list.filter.end_date.value[0]
                end_date2 = state.assignment_list.filter.end_date.value[0]
                } else {
                    let date = state.assignment_list.filter.end_date.value[0]
                    let date2 = state.assignment_list.filter.end_date.value[1]
                    if (date > date2) {
                        end_date1 = date2
                        end_date2 = date
                    } else {
                        end_date1 = date
                        end_date2 = date2
                    }
                }
            }
            const response = await http.get("/sales/assignment", {
                params: {
                  per_page:1000,
                  orderby:'-id',
                  start_date_from:start_date1,
                  start_date_to:start_date2,
                  end_date_from:end_date1,
                  end_date_to:end_date2,
                  status: status,
                  territory_id: sales_group
                }
            });
            if (response.data.data) commit('setAssignmentList', response.data.data);
            commit('setPreloadAssignmentList', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAssignmentList', false);
        }
    },

    // Create Sales Assignment
    downloadAssignmentFile: async ({ state, commit }, file) => {
        commit('setPreloadCreateAssignment', true);
        try {            
            const response = await http.get("/sales/assignment/export", {
                params: {
                    territory_id: state.create_assignment.sales_group_id,
                }
            });
            commit('setPreloadCreateAssignment', false);
            if (response) {
                window.open(response.data.data.url)
            }
        } catch (error) {     
            console.log(error);       
            commit('setPreloadCreateAssignment', false);
        }
    },
    readAssignmentFile: async ({ commit }, file) => {
        commit('setPreloadCreateAssignment', true);
        commit('setCreateAssignmentClear', false);
        try {
            commit('setCreateAssignment', []);
            let list = []
            let error_detail = []
            await file.forEach((item, i) => {
                list.push({
                    "territory_code": item.Territory_Code == null ? '' : String(item.Territory_Code),
                    "customer_code": item.Customer_Code == null ? '' : String(item.Customer_Code),
                    "customer_type": item.Customer_Type == null ? '' : String(item.Customer_Type),
                    "salesperson_code": item.Salesperson_Code == null ? '' : String(item.Salesperson_Code),
                    "task": item.Task == null ? '' : String(item.Task),
                    "visit_date": item.Visit_Date == null ? "" : Vue.moment(String(item.Visit_Date)).format('YYYY-MM-DD'),
                    "objective_codes": item.Objective_Codes == null ? '' : String(item.Objective_Codes.replace(/ /g, "")),
                })
                if(item.Objective_Codes){
                    if(item.Objective_Codes.includes(" ")){
                        error_detail.push({message:'Please ensure the Objective Code on line no.' + item.No+' contains no spaces between code'})
                    }
                }
            });
            if (file.length == 0) {
                error_detail.push({message:'File is Empty'})
            }
            commit('setCreateAssignment', list)
            commit('setCreateAssignmentErrorDetail', error_detail)
            commit('setPreloadCreateAssignment', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCreateAssignment', false);
        }
    },
    createAssignment: async ({ state, commit }, payload) => {
        commit('setPreloadCreateAssignment', true);
        commit('setCreateAssignmentSuccess', false);
        commit('setCreateAssignmentErrorDetail', []);
        commit('setCreateAssignmentClear', true);
        let data = {
            // "territory_code" : state.create_assignment.sales_group_id,
            "territory_code" : "T000001",
            "assignments": state.create_assignment.data
        }
        try {
            const response = await http.post("/sales/assignment/import", data);
            if (response) {
                commit('setCreateAssignmentSuccess', true);
            }
            commit('setPreloadCreateAssignment', false);
        } catch (error) {
            commit('setPreloadCreateAssignment', false);
            let error_detail = []
            for (var key in error.errors) {
                let getIdx = []
                let objectiveCode = []
                let indexRow = ''
                if (key.includes('id_')) {
                    getIdx = key.split("id_")
                }
                if (key.includes('sales_group_id_')) {
                    getIdx = key.split("sales_group_id_")
                }
                if (key.includes('.sales_group_id')) {
                    getIdx = key.split('.')
                }
                if (key.includes('customer_type_')) {
                    getIdx = key.split("customer_type_")
                }
                if (key.includes('.customer_type')) {
                    getIdx = key.split('.')
                }
                if (key.includes('.branch_id')) {
                    getIdx = key.split('.')
                }
                if (key.includes('salesperson_id_')) {
                    getIdx = key.split("salesperson_id_")
                }
                if (key.includes('.salesperson_id')) {
                    getIdx = key.split('.')
                }
                if (key.includes('task_')) {
                    getIdx = key.split("task_")
                }
                if (key.includes('.task')) {
                    getIdx = key.split('.')
                }
                if (key.includes('visit_date_')) {
                    getIdx = key.split("visit_date_")
                }
                if (key.includes('.visit_date')) {
                    getIdx = key.split('.')
                }
                if (key.includes('objective_codes_')) {
                    getIdx = key.split("objective_codes_")
                    objectiveCode = getIdx[1].split("_")
                    getIdx[1] = objectiveCode[0]
                }
                if (key.includes('.objective_codes')) {
                    getIdx = key.split(".")
                    objectiveCode = getIdx[1].split(".")
                    getIdx[1] = objectiveCode[0]
                }

                indexRow = parseInt(getIdx[1])+1

                if (objectiveCode.length > 0){
                    // error_detail.push({message:'Data No '+indexRow+': '+objectiveCode[1]+' - '+error.errors[key]})
                    error_detail.push({message:'Data No '+indexRow+': '+error.errors[key]})
                } else{
                    error_detail.push({message:'Data No '+indexRow+': '+error.errors[key]})
                }

                commit('setCreateAssignmentErrorDetail', error_detail)
            }
        }
    },

    // Detail Sales Assignment
    fetchAssignmentListDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDetailAssignment', true);
        commit('setDetailAssignment', []);
        try {
            let search = state.detail_assignment.filter.search
            let status = state.detail_assignment.filter.status === 999 ? '' : state.detail_assignment.filter.status      
            let task_type = state.detail_assignment.filter.task_type === '' ? '' : state.detail_assignment.filter.task_type
            let finish_date1 = ''
            let finish_date2 = ''
            if (state.detail_assignment.filter.finish_date.value.length > 0) {
                if (state.detail_assignment.filter.finish_date.value.length == 1) {
                    finish_date1 = state.detail_assignment.filter.finish_date.value[0]
                } else {
                    let date = state.detail_assignment.filter.finish_date.value[0]
                    let date2 = state.detail_assignment.filter.finish_date.value[1]
                    if (date > date2) {
                        finish_date1 = date2
                        finish_date2 = date
                    } else {
                        finish_date1 = date
                        finish_date2 = date2
                    }
                }
            }
            const response = await http.get("/sales/assignment/"+payload.id, {
                params: {
                    search: search,
                    status: status,
                    task_type: task_type,
                    finish_date_from: finish_date1,
                    finish_date_to: finish_date2
                }
            });
            if (response.data.data) commit('setDetailAssignment', response.data.data);
            commit('setPreloadDetailAssignment', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDetailAssignment', false);
        }
    },
};

export default actions;
