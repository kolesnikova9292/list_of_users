import React, { useEffect } from "react";
import Login from "./login";
import { Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { connect } from "react-redux";
import { getAuthFlag } from "../providers/redux/auth";
import Table from "./table";

const ChoosePage = (props) => {
  const { isAuthorized } = props;

  return (
    <>
      <Switch>
        <PrivateRoute
          path="/table"
          component={Table}
          exact
          isAuthorized={isAuthorized}
          loginPath="/"
        />

        <Route
          path="/"
          render={(props) => {
            if (isAuthorized == null || isAuthorized === false)
              return <Login {...props} />;
            else return <Redirect to="/table" />;
          }}
          exact
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
  };
};

export default connect(mapStateToProps)(ChoosePage);

/*<Route
path="/logout"
render={(props) => <Login {...props} goAway={true} />}
exact
/>*/
