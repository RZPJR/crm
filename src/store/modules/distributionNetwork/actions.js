import http from "../../../services/http";

const actions = {
    // Readlist Distribution Network
    fetchDistributionNetwork: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDistributionNetwork', true);
        commit('setDistributionNetwork', []);
        try {
            // let search = state.main_outlet.filter.search
            // let status = state.main_outlet.filter.status
            // const response = await http.get("/distribution-network", {
            //     params: {
            //         per_page:1000,
            //         order_by:'-id',
            //         search: search,
            //         status: status,
            //     }
            // });
            // if (response.data.data) commit('setDistributionNetwork', response.data.data);
            commit('setPreloadDistributionNetwork', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDistributionNetwork', false);
        }
    },
    
    // Detail Distribution Network
    fetchDistributionNetworkDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDistributionNetworkDetail', true);
        commit('setDistributionNetworkDetail', []);
        try {
            // const response = await http.get("/distribution-network/" + payload.id);
            // if (response.data.data) commit('setDistributionNetworkDetail', response.data.data);
            commit('setPreloadDistributionNetworkDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDistributionNetworkDetail', false);
        }
    },
    
    fetchTopProduct: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadOrderPerformance', true);
        commit('setTopProduct', {id: '', name: ''});
        try {
            // let from_date = state.distribution_network_detail.order_performance.filter.input.substr(0,10)
            // let to_date = state.distribution_network_detail.order_performance.filter.input.substr(14,23)
            // const response = await http.get("/distribution-network/" + payload.id, {
            //     params: {
            //         fromdate: from_date,
            //         todate: to_date
            //     }
            // });
            // if (response.data.data) {
            //     commit('setTopProduct', response.data.data);
            //     dispatch('fetchOrderPerformance', {id: payload.id});
            // }
            commit('setPreloadOrderPerformance', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadOrderPerformance', false);
        }
    },
    
    fetchOrderPerformance: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadOrderPerformance', true);
        commit('setOrderPerformance', {});
        try {
            // let top_product = state.distribution_network_detail.order_performance.top_product.id
            // let from_date = state.distribution_network_detail.order_performance.filter.input.substr(0,10)
            // let to_date = state.distribution_network_detail.order_performance.filter.input.substr(14,23)
            // const response = await http.get("/distribution-network/" + payload.id, {
            //     params: {
            //         top_product_id: top_product
            //         fromdate: from_date,
            //         todate: to_date
            //     }
            // });
            // if (response.data.data) {
            //     commit('setOrderPerformance', response.data.data);
            // }
            commit('setPreloadOrderPerformance', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadOrderPerformance', false);
        }
    },
    
    fetchPaymentPerformance: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadPaymentPerformance', true);
        commit('setPaymentPerformance', []);
        try {
            // const response = await http.get("/distribution-network/" + payload.id);
            // if (response.data.data) commit('setPaymentPerformance', response.data.data);
            commit('setPreloadPaymentPerformance', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadPaymentPerformance', false);
        }
    },
    
    fetchOrderPayment: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadOrderPayment', true);
        commit('setOrderPayment', []);
        try {
            // let filter = state.distribution_network_detail.order_payment.filter
            // let search = filter.search
            // let status = filter.status === 999 ? '' : filter.status
            // let sortBy = filter.sortBy
            // let invoice_date = filter.invoice_date.date
            // let overdue_date = filter.overdue_date.date
            // const response = await http.get("/distribution-network/" + payload.id, {
            //     params: {
            //         search: search,
            //         status: status,
            //         sortBy: sortBy,
            //         invoice_date: invoice_date,
            //         overdue_date: overdue_date,
            //     }
            // });
            // if (response.data.data) {
            //     commit('setOrderPayment', response.data.data);
            // }
            commit('setPreloadOrderPayment', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadOrderPayment', false);
        }
    },
};

export default actions;
