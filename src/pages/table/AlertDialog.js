import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = (props) => {
  const { open, handleYes, handleNo, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Выход"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите выйти из приложения?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            Да
          </Button>
          <Button onClick={handleNo} color="primary" autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
