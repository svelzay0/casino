import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import shared from "@/store/shared";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared
  },
});

export default store