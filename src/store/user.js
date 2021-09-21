import axiosApi from "../shared/axios";
import router from "@/router";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    user: {},
    base64Token: "",
  },
  mutations: {
    setUser(state, payload) {
      state.user.token = payload["access_token"];
      state.user.id = payload["user_id"];
      state.user.refreshToken = payload["refresh_token"];
    },
    createBase64Token(state) {
      const random = Math.random().toString(36).substring(2);
      const token = random + ":" + process.env.VUE_APP_API_KEY;
      localStorage.setItem("token64", btoa(token));
      state.base64Token = btoa(token);
    },
    clearUser(state) {
      state.user = {};
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axiosApi({
          url: process.env.VUE_APP_API_AUTH + "/auth/login",
          data: {
            username: email,
            password: password,
          },
        });
        commit("setUser", data);
        setItems(localStorage, data);
        localStorage.setItem("user", data["user_id"]);
        this.commit("shared/setLoading", false);
        return true;
      } catch (e) {
        if (e.response.status === 401) {
          this.commit("shared/setLoading", false);
          this.commit("shared/setError", 'Неверный логин или пароль');
        }
        handleError(e);
      }
    },
    async refreshToken({ commit }) {
      this.commit("shared/clearError");
      try {
        const { data } = await axiosApi({
          url: process.env.VUE_APP_API_AUTH + "/auth/refresh",
          method: "post",
          data: {
            refresh_token: localStorage.getItem("refresh_token"),
            client_id: localStorage.getItem("user"),
            client_secret: process.env.VUE_APP_API_KEY,
          },
        });
        commit("setUser", data);
        setItems(localStorage, data);
        this.commit("shared/clearError");
      } catch (e) {
        this.commit("shared/setError", e.message);
        handleError(e);
      }
    },
    async logoutUser({ commit }) {
      this.commit("shared/clearError");
      localStorage.setItem("logout", true);
      try {
        await axiosApi({
          url: process.env.VUE_APP_API_AUTH + "/auth/logout"
        });
        removeItems(localStorage);
        commit("clearUser");
        await router.push({ name: "Auth" });
      } catch (e) {
        removeItems(localStorage);
        this.commit("shared/setError", e.message);
        handleError(e);
      }
    },
  },
  getters: {
    base64Token(state) {
      return state.base64Token;
    },
  },
};

const setItems = (localStorage, data) => {
  const now = Date.now();
  localStorage.setItem("token", data["access_token"]);
  localStorage.setItem("refresh_token", data["refresh_token"]);
  localStorage.setItem("tokenCreated", now);
}

const removeItems = (localStorage) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("tokenCreated");
  localStorage.removeItem("user");
}