import { createAction } from "redux-actions";

export const fetchAuthRequest = createAction("GET_AUTH_REQUEST");
export const fetchAuthSucces = createAction("GET_AUTH_SUCCESS");
export const fetchAuthFailure = createAction("GET_AUTH_FAILURE");
