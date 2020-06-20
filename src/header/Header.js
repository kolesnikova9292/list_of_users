import React from "react";
import { getAuthFlag } from "../providers/redux/auth";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import "./Header.css";

const Header = (props) => {
  const { isAuthorized, handleLogoutTry } = props;
  return (
    <div className="outer_div">
      {isAuthorized === true && (
        <>
          <Button onClick={handleLogoutTry} className="logout_button">
            Выйти
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
  };
};

export default connect(mapStateToProps)(Header);

/*
 <Button
            component={Link}
            //to="/"

            to="/logout"
            id="logout"
            className="logout_button"
          >
            Выйти
          </Button>*/

/*const Header = (props) => {
  const { isAuthorized } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isAuthorized === true ? (
            <>
              <Button component={Link} to="/map" id="my-map">
                Карта
              </Button>
              <Button
                component={Link}
                to="/personal"
                id="personal-area"
                data-testid="personal-area"
              >
                Профиль
              </Button>
              <Button component={Link} to="/logout" id="logout">
                Выйти
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" id="login">
              Войти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};*/
