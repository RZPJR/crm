import http from "../../../services/http";

const actions = {
    // Readlist Customer Acquisition
    fetchCustomerAcquisition: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerAcquisition', true);
        commit('setCustomerAcquisition', []);
        try {
            let search = state.customer_acquisition.filter.search
            let sales_person = state.customer_acquisition.filter.salesperson === 999 ? '' : "|salesperson_id.e:"+state.customer_acquisition.filter.salesperson      
            let sales_group = state.customer_acquisition.filter.sales_group_id === '' ? '' : "|sales_group_id.e:"+state.customer_acquisition.filter.sales_group_id
            let submitted_date = ''
            if (state.customer_acquisition.filter.submitted_date.value.length > 0) {
                if (state.customer_acquisition.filter.submitted_date.value.length == 1) {
                    submitted_date = '|submit_date:' + state.customer_acquisition.filter.submitted_date.value[0]
                    submitted_date = '|submit_date.gte:'+state.customer_acquisition.filter.submitted_date.value[0]+'T00:00:00Z'+ '|submit_date.lte:'+state.customer_acquisition.filter.submitted_date.value[0]+'T23:59:59Z'
                } else {
                    let date = state.customer_acquisition.filter.submitted_date.value[0]
                    let date2 = state.customer_acquisition.filter.submitted_date.value[1]
                    if (date > date2) {
                        submitted_date = '|submit_date.gte:'+date2+'T00:00:00Z'+ '|submit_date.lte:'+date+'T23:59:59Z'
                    } else {
                        submitted_date = '|submit_date.gte:'+date+'T00:00:00Z'+ '|submit_date.lte:'+date2+'T23:59:59Z'
                    }
                }
            }
            // const response = await http.get("/crm/acquisition", {
            //     params: {
            //       perpage:100,
            //       embeds:'salesperson,salesgroup',
            //       conditions:'Or.name.icontains:'+search+'%2COr.phone_number.icontains:'+search+sales_person+sales_group+submitted_date,
            //       orderby:'-id',
            //     }
            // });
            // if (response.data.data) commit('setCustomerAcquisition', response.data.data);
            commit('setPreloadCustomerAcquisition', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerAcquisition', false);
        }
    },
};

export default actions;
