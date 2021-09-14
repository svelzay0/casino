import axios from "axios";
// import router from "@/router";
import handleError from "../shared/error";
// import headers from "../shared/headers";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchOrders(context) {
      this.commit("home/setLoading", true);
      try {
        const { data } = await axios({
          url: "/car?offset=" + context.getters.getOffset + "&limit=10",
          method: "get"
        });
        console.log(data)
        // if (context.getters.getOffset !== 0) {
        //   context.commit("addCars", data.data);
        // }
        // else {
        //   context.commit("setCars", data.data);
        // }
        // context.commit("setOffset", context.getters.getOffset + 10);
        // this.commit("home/setLoading", false);
      } catch (e) {
        this.commit("home/setLoading", false);
        handleError(e);
      }
    }
  },
  getters: {},
};
