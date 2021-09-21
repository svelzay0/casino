import axios from "axios";
import headers from "./headers";
import store from '../store/index'

const base64Token = localStorage.getItem("token64");

const axiosApi = axios.create();

axiosApi.interceptors.request.use( config => {
  config.method = 'post';
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("logout")) {
      config.headers = headers(process.env, localStorage.getItem("token"), 'Bearer ');
      localStorage.removeItem("logout");
    } else {
      config.headers = headers(process.env, base64Token, 'Basic ');
    }
  } else {
    config.headers = headers(process.env, base64Token, 'Basic ');
  }
  config.baseURL = process.env.VUE_APP_API_PROD;

  return config;
});

axiosApi.interceptors.response.use(response => response, error => {
  const { status } = error.response
  if (status === 401) {
    if (localStorage.getItem("tokenCreated")) {
      const tokenAge = Date.now() - localStorage.getItem("tokenCreated");
      if (tokenAge < 86100000) {
        store.dispatch('user/refreshToken');
      } else {
        store.dispatch('user/logoutUser');
      }
    } 
  }

  return Promise.reject(error)
});

export default axiosApi;
