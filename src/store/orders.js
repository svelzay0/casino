import axiosApi from "../shared/axios2";
// import router from "@/router";
import handleError from "../shared/error";
// import headers from "../shared/headers";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchOrders(context) {
      // this.commit("home/setLoading", true);
      // console.log(123, context)
      try {
        // const axiosApi = axios.create();

        // axiosApi.interceptors.request.use(async config => {
        //   config.headers = {
        //     "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
        //     Accept: "application/json"
        //   };
        //   config.baseURL = process.env.VUE_APP_API_PROD;
        //   return config;
        // });
        // const { data } = await axiosApi({
        //   url: "order?limit=10",
        //   method: "get"
        // });
        const { data } = await axiosApi(ApiRequest("/order"));
        console.log(data, context)
        // if (context.getters.getOffset !== 0) {
        //   context.commit("addCars", data.data);
        // }
        // else {
        //   context.commit("setCars", data.data);
        // }
        // context.commit("setOffset", context.getters.getOffset + 10);
        // this.commit("home/setLoading", false);
      } catch (e) {
        // this.commit("home/setLoading", false);
        handleError(e);
      }
    }
  },
  getters: {},
};

const ApiRequest = (url) => {
  return {
    url: url,
    method: "get"
  }
}