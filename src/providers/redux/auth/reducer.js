import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { fetchAuthSucces, fetchAuthFailure } from "./actions";

const token = handleActions(
  {
    [fetchAuthSucces]: (_state, action) => action.payload.token,
    [fetchAuthFailure]: () => null,
  },
  null
);

const isAuthorized = handleActions(
  {
    [fetchAuthSucces]: () => true,
    [fetchAuthFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchAuthFailure]: (_state, action) => "Ошибка аутентификации",
  },
  null
);

export default combineReducers({
  token,
  isAuthorized,
  error,
});
