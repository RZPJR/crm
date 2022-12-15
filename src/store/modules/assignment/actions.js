import http from "../../../services/http";

const actions = {
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
      // const response = await http.get("/crm/assignment", {
      //     params: {
      //       perpage:100,
      //       embeds:'sales_group_id,sales_group_id.sls_man_id',
      //       conditions:'Or.status.icontains:'+status+sales_group+startDate+end_date,
      //       orderby:'-id',
      //     }
      // });
      // if (response.data.data) commit('setAssignmentList', response.data.data);
      commit('setPreloadAssignmentList', false);
    } catch (error) {
      console.log(error);
      commit('setPreloadAssignmentList', false);
    }
  },
};

export default actions;
