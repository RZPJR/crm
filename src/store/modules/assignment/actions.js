import http from "../../../services/http";
import Vue from 'vue'

const actions = {
    // Readlist Sales Assignment
    fetchAssignmentList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAssignmentList', true);
        commit('setAssignmentList', []);
        try {
            let status = state.assignment_list.filter.status === 999 ? '' : "|status:"+state.assignment_list.filter.status      
            let sales_group = state.assignment_list.filter.sales_group_id === '' ? '' : "|sales_group_id.e:"+state.assignment_list.filter.sales_group_id
            let start_date = ''
            if (state.assignment_list.filter.start_date.length > 0) {
                if (state.assignment_list.filter.start_date.length == 1) {
                start_date = '|start_date:' + state.assignment_list.filter.start_date[0]
                } else {
                    let date = state.assignment_list.filter.start_date[0]
                    let date2 = state.assignment_list.filter.start_date[1]
                    if (date > date2) {
                        start_date = '|start_date.gte:' + date2 + '|start_date.lte:' + date
                    } else {
                        start_date = '|start_date.gte:' + date + '|start_date.lte:' + date2
                    }
                }
            }
            let end_date = ''
            if (state.assignment_list.filter.end_date.length > 0) {
                if (state.assignment_list.filter.end_date.length == 1) {
                    end_date = '|end_date:' + state.assignment_list.filter.end_date[0]
                } else {
                    let date = state.assignment_list.filter.end_date[0]
                    let date2 = state.assignment_list.filter.end_date[1]
                    if (date > date2) {
                        end_date = '|end_date.gte:' + date2 + '|end_date.lte:' + date
                    } else {
                        end_date = '|end_date.gte:' + date + '|end_date.lte:' + date2
                    }
                }
            }
            const response = await http.get("/sales/assignment", {
                params: {
                  perpage:100,
                  orderby:'-id',
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
                    teritory_id: state.create_assignment.sales_group_id,
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
                    "visit_date": item.Visit_Date == null ? "" : Vue.moment(String(item.Visit_Date)).format(),
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
                this.$toast.open({
                    position: 'top-right',
                    message: "Data has been uploaded successfully",
                    type: 'success',
                });
            }
            commit('setPreloadCreateAssignment', false);
            window.location.replace("/customer-relation/sales-assignment");
        } catch (error) {
            commit('setPreloadCreateAssignment', e.errors);
            let error_detail = []
            for (var key in state.create_assignment.error) {
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
                if (key.includes('objective_code_')) {
                    getIdx = key.split("objective_code_")
                    objectiveCode = getIdx[1].split("_")
                    getIdx[1] = objectiveCode[0]
                }

                indexRow = parseInt(getIdx[1])+1
                
                if (objectiveCode.length > 0){
                    error_detail.push({message:'Data No '+indexRow+': '+objectiveCode[1]+' - '+state.create_assignment.error[key]})
                } else{
                    error_detail.push({message:'Data No '+indexRow+': '+state.create_assignment.error[key]})
                }
            }
            commit('setCreateAssignmentErrorDetail', error_detail)
            commit('setPreloadCreateAssignment', false);
        }
    },

    // Detail Sales Assignment
    fetchAssignmentListDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDetailAssignment', true);
        commit('setDetailAssignment', []);
        try {
            let search = state.detail_assignment.filter.search
            let status = state.detail_assignment.filter.status === 999 ? '' : "|status:"+state.detail_assignment.filter.status      
            let task_type = state.detail_assignment.filter.task_type === '' ? '' : "|task:"+state.detail_assignment.filter.task_type
            let finish_date = ''
            if (state.detail_assignment.filter.finish_date.value.length > 0) {
                if (state.detail_assignment.filter.finish_date.value.length == 1) {
                    finish_date = '|finish_date.gte:'+state.detail_assignment.filter.finish_date.value[0]+'T00:00:00Z'+ '|finish_date.lte:'+ state.detail_assignment.filter.finish_date.value[0]+'T24:59:59Z'
                } else {
                    let date = state.detail_assignment.filter.finish_date.value[0]
                    let date2 = state.detail_assignment.filter.finish_date.value[1]
                    if (date > date2) {
                        finish_date = '|finish_date.gte:'+date2+'T00:00:00Z'+ '|finish_date.lte:'+date+'T24:59:59Z'
                    } else {
                        finish_date = '|finish_date.gte:'+date+'T00:00:00Z'+ '|finish_date.lte:'+date2+'T24:59:59Z'
                    }
                }
            }
            const response = await http.get("/sales/assignment/"+payload.id);
            if (response.data.data) commit('setDetailAssignment', response.data.data.sales_assignment_item);
            commit('setPreloadDetailAssignment', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDetailAssignment', false);
        }
    },
};

export default actions;
