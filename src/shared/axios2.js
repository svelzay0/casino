import axios from "axios";

const axiosApi2 = axios.create();

axiosApi2.interceptors.request.use(async config => {
  config.headers = {
    "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
    Accept: "application/json",
    "Authorization": "Bearer 52efbe08228671240494f537f2486bc109a637b4"
  };
  config.baseURL = process.env.VUE_APP_API_PROD;
  return config;
});

export default axiosApi2;
