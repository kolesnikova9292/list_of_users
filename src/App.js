import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Login } from "./login";
import { Table } from "./table";
import { PrivateRoute } from "./PrivateRoute";
import { connect } from "react-redux";
import { getAuthFlag } from "./providers/redux/auth";

const App = (props) => {
  const { isAuthorized } = props;
  /*const changeAuthFlag = () => {
    setIsAuthorized(true);
  };
  const [isAuthorized, setIsAuthorized] = useState(false);*/

  return (
    <div className="App">
      <BrowserRouter>
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

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
