import { createStore, applyMiddleware, compose } from "redux";
import { loftTaxiMiddleware } from "./auth";
import thunk from "redux-thunk";
import rootReducer from "./auth";

export const initialState = {
  token: null,
  isAuthorized: false,
  error: null,
};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), applyMiddleware(loftTaxiMiddleware))
);

export default store;
