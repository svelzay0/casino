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
        const { data } = await axios(ApiRequest("get", "/city"));
        context.commit("setCities", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrders(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/order"));
        context.commit("setOrders", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrderStatuses(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/orderStatus"));
        context.commit("setOrderStatuses", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCategories(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/category"));
        context.commit("setCategories", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchRateTypes(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/rateType"));
        context.commit("setRateTypes", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async deleteOrder(context, id) {
      try {
        await axios(ApiRequest("delete", `/order/${id}`));
      } catch (e) {
        handleError(e);
      }
    },
    async editOrder(context, item) {
      try {
        const data = item
        await axios(ApiRequest("put",`/order/${item.id}`, data));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrderToCancel(context, id, status) {
      try {
        const data = {
          orderStatusId: status
        }
        await axios(ApiRequest("put", `/order/${id}`, data));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrderToDone(context, id, status) {
      try {
        const data = {
          orderStatusId: status
        }
        await axios(ApiRequest("put", `/order/${id}`, data));
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

const ApiRequest = (method, url, data = null) => {
  return {
    url: process.env.VUE_APP_API_PROD + url,
    method: method,
    headers: {
      "X-Api-Factory-Application-Id": process.env["VUE_APP_API_FACTORY_ID"],
      Accept: "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    data: data
  }
}