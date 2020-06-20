import { createStore, applyMiddleware, compose } from "redux";
import { emphasoftMiddleware } from "./auth";
import thunk from "redux-thunk";
import rootReducer from "./auth";

export const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isAuthorized: localStorage.getItem("token") ? true : false,
  error: null,
};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), applyMiddleware(emphasoftMiddleware))
);

export default store;
