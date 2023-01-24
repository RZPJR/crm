import Vue from "vue";
import Vuex from "vuex";

import assignment from "./modules/assignment";
import assignmentObjective from "./modules/assignmentObjective";
import assignmentSubmission from "./modules/assignmentSubmission";
import customerAcquisition from "./modules/customerAcquisition";
import prospectCustomer from "./modules/prospectCustomer";

Vue.use(Vuex);
Vue.use(require('vue-moment'));

export default new Vuex.Store({
  modules: {
    assignment,
    assignmentObjective,
    customerAcquisition,
    prospectCustomer
  }
});
