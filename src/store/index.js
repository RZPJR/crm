import Vue from "vue";
import Vuex from "vuex";

import assignment from "./modules/assignment";
import prospectCustomer from "./modules/prospectCustomer";
import assignmentObjective from "./modules/assignmentObjective";
import assignmentSubmission from "./modules/assignmentSubmission";
import customerAcquisition from "./modules/customerAcquisition";
import salesPerformance from "./modules/salesPerformance";
import distributionNetwork from "./modules/distributionNetwork";
import pagination from "./modules/pagination";

Vue.use(Vuex);
Vue.use(require('vue-moment'));

export default new Vuex.Store({
  modules: {
    assignment,
    prospectCustomer,
    assignmentObjective,
    customerAcquisition,
    salesPerformance,
    assignmentSubmission,
    distributionNetwork,
    pagination,
  }
});
