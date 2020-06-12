import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: RouteComponent,
  isAuthorized,
  loginPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) =>
      isAuthorized ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={loginPath} />
      )
    }
  />
);
