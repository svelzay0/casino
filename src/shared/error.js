import store from "@/store/shared";

const handleError = (e) => {
  store.mutations.setError(store.state, "Ошибка " + e);
}

export default handleError;
