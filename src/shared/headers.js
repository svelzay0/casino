const headers = (env, token, prefix) => {
  return {
    "X-Api-Factory-Application-Id": `${env["VUE_APP_API_FACTORY_ID"]}`,
    "Content-Type": "application/json",
    "Authorization": prefix + token,
  }
}

export default headers;