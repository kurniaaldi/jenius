import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import PropTypes from "prop-types";
import React from "react";

function ModalConfirmDelete({ confirmDelete, close }) {
  const { open, onOk, text } = confirmDelete;
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus="true">
            Cancel
          </Button>
          <Button
            onClick={() => {
              close();
              onOk();
            }}
            style={{ backgroundColor: "#f82b60", color: "white" }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// ModalConfirmDelete.propTypes = {
//   open: PropTypes.bool,
//   close: PropTypes.func,
//   onOk: PropTypes.func,
//   text: PropTypes.string,
// };

export default ModalConfirmDelete;
