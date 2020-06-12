import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAuthRequest } from "../providers/redux/auth";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getAuthFlag } from "../providers/redux/auth";
import { getError } from "../providers/redux/auth";
import Snackbar from "@material-ui/core/Snackbar";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors, setValue } = useForm();
  const { fetchAuthRequest, isAuthorized, error } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue("login", "test_super");
    setValue("password", "Nf<U4f<rDbtDxAPn");
    /*if (isAuthorized === true) {
      props.history.push("/table");
    }*/
    console.log(1111111);
    if (error != null) {
      setOpen(true);
    }
  }, [isAuthorized, error, setValue]);

  /*const handleLogIn = async (event) => {
    event.preventDefault();
    await fetchAuthRequest({ login, password });
    props.history.push("/table");
  };*/

  const handleLogIn = async (data) => {
    const { login, password } = data;
    await fetchAuthRequest({ login, password });
    props.history.push("/table");
  };

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

  /*const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };*/

  return (
    <div className="divForForm">
      <Card className="cardForForm">
        <form onSubmit={handleSubmit(handleLogIn)}>
          <RHFInput
            as={
              <TextField
                className="textFieldForLoginForm"
                label="Логин"
                color="secondary"
                type="text"
                error={errors.login != null ? true : false}
              />
            }
            rules={{
              required: true,
            }}
            helperText={returnError(errors.login)}
            name="login"
            register={register}
            setValue={setValue}
          />
          <br />
          <RHFInput
            as={
              <TextField
                label="Пароль"
                color="secondary"
                type="text"
                className="textFieldForLoginForm"
                error={errors.password != null ? true : false}
              />
            }
            helperText={returnError(errors.password)}
            rules={{ required: true }}
            name="password"
            register={register}
            setValue={setValue}
          />
          <br />
          {/*<TextField
        className="textFieldForLoginForm"
        label="Логин"
        color="secondary"
        type="text"
        name="login"
        error={errors.login != null ? true : false}
        inputRef={register({
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        })}
        helperText={returnError(errors.login)}
        setValue={setValue}
      />
      <br />
      <TextField
        label="Пароль"
        color="secondary"
        type="text"
        name="password"
        className="textFieldForLoginForm"
        inputRef={register({ required: true })}
        error={errors.password != null ? true : false}
        helperText={returnError(errors.password)}
      />
      <br />*/}
          <Button type="submit" value="Войти">
            Войти
          </Button>
        </form>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        onClose={handleCloseSnackBar}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{error}</span>}
      />
    </div>
  );
};

/*return (
    <>
      <form onSubmit={handleLogIn}>
        <div>
          <label>
            Логин:
            <input
              type="text"
              value={login}
              name="login"
              onChange={handleChangeLogin}
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Войти" />
        </div>
      </form>
    </>
  );
};*/

const mapDispatchToProps = { fetchAuthRequest };

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export function returnError(error) {
  return error !== undefined && error.type === "required"
    ? "Поле обязательно"
    : null;
}
