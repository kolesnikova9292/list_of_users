import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { Card, Button, TextField, Snackbar } from "@material-ui/core";
import {
  getAuthFlag,
  getError,
  fetchAuthRequest,
} from "../providers/redux/auth";
import "./LoginForm.css";

const LoginForm = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const { fetchAuthRequest, isAuthorized, error } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue("login", "test_super");
    setValue("password", "Nf<U4f<rDbtDxAPn");

    if (error != null) {
      setOpen(true);
    }
  }, [isAuthorized, error, setValue]);

  const handleLogIn = async (data) => {
    const { login, password } = data;
    await fetchAuthRequest({ login, password });
    props.history.push("/table");
  };

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

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
