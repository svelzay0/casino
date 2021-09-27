import store from "@/store/shared";

export default function (to, from, next) {
  store.mutations.clearError(store.state);
  if (localStorage.getItem("token")) {
    next();
  } else {
    store.mutations.setError(store.state, "Пройдите авторизацию");
    next("/");
  }
}