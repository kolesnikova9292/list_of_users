import React, { useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import ChoosePage from "./pages/ChoosePage";
import Header from "./header/Header";
import { connect } from "react-redux";
//import { getAuthFlag } from "./providers/redux/auth";
import { logout } from "./providers/redux/auth";
import AlertDialog from "./pages/table/AlertDialog";

const App = (props) => {
  const { logout } = props;

  const [open, setOpen] = React.useState(false);

  const handleLogoutTry = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    logout();
    localStorage.removeItem("token");
  };

  const handleNo = () => {
    setOpen(false);
  };

  /*const basename = "test";
  const history = useRouterHistory(createHistory)({
    basename,
  });*/

  return (
    <div className="App">
      <HashRouter basename="/">
        <Header handleLogoutTry={handleLogoutTry} />
        <ChoosePage />
        <AlertDialog
          open={open}
          handleClose={handleClose}
          handleNo={handleNo}
          handleYes={handleYes}
        />
      </HashRouter>
    </div>
  );
};

/*const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
  };
};*/

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(App);

/*<Switch>
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
        </Switch>*/
