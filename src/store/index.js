import Vue from "vue";
import Vuex from "vuex";

import assignment from "./modules/assignment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    assignment
  }
});
