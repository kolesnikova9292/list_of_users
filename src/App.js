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
      <HashRouter basename="/">
        <Switch>
          <PrivateRoute
            path="/table"
            component={Table}
            exact
            isAuthorized={isAuthorized}
            loginPath="/"
          />
          <Route path="/" render={(props) => <Login {...props} />} exact />
          <Route
            path="/"
            component={isAuthorized === true ? Table : Login}
            exact
          />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
  };
};

export default connect(mapStateToProps)(App);
