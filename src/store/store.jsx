import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// const user = sessionStorage.getItem("user");
// if (user !== null) {
//   store.dispatch(setUser(JSON.parse(user)));
// }

export default store;
