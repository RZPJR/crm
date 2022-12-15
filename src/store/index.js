import Vue from "vue";
import Vuex from "vuex";

import assignment from "./modules/assignment";
import assignmentObjective from "./modules/assignmentObjective";
import customerAcquisition from "./modules/customerAcquisition";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    assignment,
    assignmentObjective,
    customerAcquisition,
  }
});
