import axios from "axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async fetchOrders(context) {
      // this.commit("home/setLoading", true);
      try {
        const { data } = await axios(ApiRequest(`${process.env.VUE_APP_API_PROD}/order`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setOrders", data.data);
        // this.commit("home/setLoading", false);
        console.log(data, context)
      } catch (e) {
        // this.commit("home/setLoading", false);
        handleError(e);
      }
    }
  },
  getters: {
    getOrders(state) {
      return state.orders;
    }
  },
};

const ApiRequest = (url, api, prefix, token) => {
  return {
    url: url,
    method: "get",
    headers: {
      "X-Api-Factory-Application-Id": api,
      Accept: "application/json",
      "Authorization": prefix + token
    }
  }
}