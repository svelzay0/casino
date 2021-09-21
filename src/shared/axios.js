import axios from "axios";
import headers from "headers";

const base64Token = localStorage.getItem("token64");

const axiosApi = axios.create();

axiosApi.interceptors.request.use(async config => {


  // if (localStorage.getItem("tokenCreated")) {
  //   const tokenAge = Date.now() - localStorage.getItem("tokenCreated");
  //   if (tokenAge < 86100000) {
  //     this.refreshToken();
  //   } else {
  //     this.logoutUser();
  //   }


  // function (error) {
  //  const originalRequest = error.config;
  //  if (error.response.status === 401 && !originalRequest._retry) {

  //      originalRequest._retry = true;
  //      return axios.post('/auth/token',
  //          {
  //              "refresh_token": localStorageService.getRefreshToken()
  //          })
  //          .then(res => {
  //              if (res.status === 201) {
  //                  // 1) put token to LocalStorage
  //                  localStorageService.setToken(res.data);

  //                  // 2) Change Authorization header
  //                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

  //                  // 3) return originalRequest object with Axios.
  //                  return axios(originalRequest);
  //              }
  //          })
  //  }

  function (error) {
    console.log(error.response.data)
    if (error.response.status === 401) {
      store.dispatch('logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }

  if (localStorage.getItem("token")) {
    config.headers = {
      "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
      "Content-Type": "application/json",
    };
  } else {
    config.headers = headers(process.env, base64Token);
  }

  config.baseURL = process.env.VUE_APP_API_PROD;
  return config;
});

export default axiosApi;
