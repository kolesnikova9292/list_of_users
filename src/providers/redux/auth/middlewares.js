import { fetchAuthRequest, fetchAuthSucces, fetchAuthFailure } from "./actions";
import axios from "axios";

export const emphasoftMiddleware = (store) => (next) => async (action) => {
  if (action.type === fetchAuthRequest.toString()) {
    await axios
      .post(
        "https://emphasoft-test-assignment.herokuapp.com/api-token-auth/",
        {
          username: action.payload.login,
          password: action.payload.password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((data) => {
        if (data.status === 200) store.dispatch(fetchAuthSucces(data.data));
        else store.dispatch(fetchAuthFailure("error"));
      })
      .catch((error) => {
        store.dispatch(fetchAuthFailure(error));
      });
  }

  const result = next(action);
  return result;
};
