import axios from "axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cities: [],
    points: [],
    orders: [],
    cars: [],
    car: {},
    orderStatuses: [],
    categories: [],
    rates: [],
    rateTypes: [],
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
    setCars(state, payload) {
      state.cars = payload;
    },
    setCar(state, payload) {
      state.car = payload;
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
    async fetchCities({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/city"));
        commit("setCities", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchPoints({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/point"));
        commit("setPoints", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrders({ commit }, item) {
      try {
        const { data } = await axios(ApiRequest("get", `/order?offset=${item.offset}&limit=${item.limit}`));
        commit("setOrders", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCars({ commit }, item) {
      try {
        const { data } = await axios(ApiRequest("get", `/car?offset=${item.offset}&limit=${item.limit}`));
        commit("setCars", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCar({ commit }, id) {
      try {
        const { data } = await axios(ApiRequest("get", `/car/${id}`));
        commit("setCar", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchOrderStatuses({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/orderStatus"));
        commit("setOrderStatuses", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/category"));
        commit("setCategories", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchRates({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/rate"));
        commit("setRates", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchRateTypes({ commit }) {
      try {
        const { data } = await axios(ApiRequest("get", "/rateType"));
        commit("setRateTypes", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async deleteEntity(context, item) {
      try {
        await axios(ApiRequest("delete", `/${item.entity}/${item.id}`));
      } catch (e) {
        handleError(e);
      }
    },
    async editEntity(context, item) {
      console.log(item)
      try {
        await axios(ApiRequest("put", `/${item.entityName}/${item.item.id}`, item.item));
      } catch (e) {
        handleError(e);
      }
    },
    async createEntity(context, item) {
      try {
        await axios(ApiRequest("post", `/${item.entityName}`, item.item));
      } catch (e) {
        handleError(e);
      }
    },
    async changeStatusOfOrder(context, item) {
      try {
        await axios(ApiRequest("put", `/order/${item.id}`, {orderStatusId: item.status}));
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
    getCars(state) {
      return state.cars;
    },
    getCar(state) {
      return state.car;
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