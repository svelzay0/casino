import axios from "axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cities: [],
    points: [],
    orders: [],
    orderStatuses: [],
    categories: [],
    rates: [],
    rateTypes: []
  },
  mutations: {
    setCities(state, payload) {
      state.cities = payload;
    },
    setPoints(state, payload) {
      state.points = payload;
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
    setRates(state, payload) {
      state.rates = payload;
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
    async fetchPoints(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/point"));
        context.commit("setPoints", data.data);
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
    async fetchRates(context) {
      try {
        const { data } = await axios(ApiRequest("get", "/rate"));
        context.commit("setRates", data.data);
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
    async deleteEntity(context, item) {
      try {
        await axios(ApiRequest("delete", '/' + item.entity + '/' + item.id));
      } catch (e) {
        handleError(e);
      }
    },
    async editEntity(context, item) {
      try {
        await axios(ApiRequest("put", '/' + item.entityName + '/' + item.item.id, item.item));
      } catch (e) {
        handleError(e);
      }
    },
    async createEntity(context, item) {
      try {
        await axios(ApiRequest("post", '/' + item.entityName, item.item));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrder(context, id, status) {
      try {
        await axios(ApiRequest("put", `/order/${id}`, {orderStatusId: status}));
      } catch (e) {
        handleError(e);
      }
    }
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getPoints(state) {
      return state.points;
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
    getRates(state) {
      return state.rates;
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