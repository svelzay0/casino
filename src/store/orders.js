import axios from "axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchOrders(context) {
      // this.commit("home/setLoading", true);
      try {
        const { data } = await axios(ApiRequest(`${process.env.VUE_APP_API_PROD}/order`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        console.log(data, context)
      } catch (e) {
        // this.commit("home/setLoading", false);
        handleError(e);
      }
    }
  },
  getters: {},
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