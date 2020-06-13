import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import { Login } from "./login";
import { Table } from "./table";
import { PrivateRoute } from "./PrivateRoute";
import { connect } from "react-redux";
import { getAuthFlag } from "./providers/redux/auth";

const App = (props) => {
  const { isAuthorized } = props;

  return (
    <div className="App">
      <BrowserRouter basename={"/list-of-users"}>
        <Switch>
          <PrivateRoute
            path={`${process.env.PUBLIC_URL}/table`}
            component={Table}
            exact
            isAuthorized={isAuthorized}
            loginPath={`${process.env.PUBLIC_URL}/`}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            render={(props) => <Login {...props} />}
            exact
          />
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            component={isAuthorized === true ? Table : Login}
            exact
          />
          <Redirect to={`${process.env.PUBLIC_URL}/`} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
  };
};

export default connect(mapStateToProps)(App);
