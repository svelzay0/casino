const headers = (env, token) => {
  return {
    "X-Api-Factory-Application-Id": `${env["VUE_APP_API_FACTORY_ID"]}`,
    "Content-Type": "application/json",
    "Authorization": "Basic " + token,
  }
}

export default headers;