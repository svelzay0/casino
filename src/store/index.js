import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import shared from "@/store/shared";
import entities from "@/store/entities";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared,
    entities
  },
});

export default store