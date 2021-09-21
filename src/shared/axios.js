import axios from "axios";
import headers from "./headers";
// import store from '~/store'
// import router from '~/router'

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
    const tokenAge = Date.now() - localStorage.getItem("tokenCreated");
      if (tokenAge < 86100000) {
        this.refreshToken();
      } else {
        this.logoutUser();
      }
    // store.commit('auth/LOGOUT')
    // router.push({ name: 'login' })
    console.log(status)
  }
  // if (status === 403) {
  //   Swal.fire({
  //     icon: 'warning',
  //     title: i18n.t('403 ошибка'),
  //     text: i18n.t('Отказано в доступе'),
  //     reverseButtons: true,
  //     confirmButtonText: i18n.t('ok'),
  //     cancelButtonText: i18n.t('cancel')
  //   }).then(() => {
  //     router.push({ name: 'home' })
  //   })
  // }

  return Promise.reject(error)
});

export default axiosApi;
