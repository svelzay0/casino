import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import shared from "@/store/shared";
import orders from "@/store/orders";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared,
    orders
  },
});

export default store