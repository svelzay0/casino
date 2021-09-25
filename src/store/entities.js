import axios from "axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cities: [],
    orders: [],
    orderStatuses: [],
    categories: [],
    rateTypes: []
  },
  mutations: {
    setCities(state, payload) {
      state.cities = payload;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setOrderStatuses(state, payload) {
      state.orderStatuses = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setRateTypes(state, payload) {
      state.rateTypes = payload;
    }
  },
  actions: {
    async fetchCities(context) {
      try {
        const { data } = await axios(ApiRequest("get", `${process.env.VUE_APP_API_PROD}/city`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setCities", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrders(context) {
      try {
        const { data } = await axios(ApiRequest("get", `${process.env.VUE_APP_API_PROD}/order`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setOrders", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrderStatuses(context) {
      try {
        const { data } = await axios(ApiRequest("get", `${process.env.VUE_APP_API_PROD}/orderStatus`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setOrderStatuses", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCategories(context) {
      try {
        const { data } = await axios(ApiRequest("get", `${process.env.VUE_APP_API_PROD}/category`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setCategories", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchRateTypes(context) {
      try {
        const { data } = await axios(ApiRequest("get", `${process.env.VUE_APP_API_PROD}/rateType`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
        context.commit("setRateTypes", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async deleteOrder(context, id) {
      try {
        await axios(ApiRequest("delete", `${process.env.VUE_APP_API_PROD}/order/${id}`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
      } catch (e) {
        handleError(e);
      }
    },
    async editOrder(context, id) {
      try {
        await axios(ApiRequest("put",`${process.env.VUE_APP_API_PROD}/order/${id}`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token")));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrderToCancel(context, id) {
      try {
        const data = {
          orderStatusId: {
            id: "5e26a1f5099b810b946c5d8c",
            name: "Отмененые"
          }
        }
        await axios(ApiRequest("put", `${process.env.VUE_APP_API_PROD}/order/${id}`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token"), data));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrderToDone(context, id) {
      try {
        const data = {
          orderStatusId: {
            id: "5e26a1f0099b810b946c5d8b",
            name: "Подтвержденные"
          }
        }
        await axios(ApiRequest("put", `${process.env.VUE_APP_API_PROD}/order/${id}`, process.env["VUE_APP_API_FACTORY_ID"], "Bearer ", localStorage.getItem("token"), data));
      } catch (e) {
        handleError(e);
      }
    },
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getOrders(state) {
      return state.orders;
    },
    getOrderStatuses(state) {
      return state.orderStatuses;
    },
    getCategories(state) {
      return state.categories;
    },
    getRateTypes(state) {
      return state.rateTypes;
    }
  },
};

const ApiRequest = (method, url, api, prefix, token, data = null) => {
  return {
    url: url,
    method: method,
    headers: {
      "X-Api-Factory-Application-Id": api,
      Accept: "application/json",
      "Authorization": prefix + token
    },
    data: data
  }
}