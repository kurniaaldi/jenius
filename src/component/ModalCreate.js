import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  input: {
    marginBottom: 15,
  },
});

export default function ModalCreate(props) {
  const {
    open,
    close,
    setDataForm,
    dataForm,
    createContact,
    editContact,
    mode,
  } = props;
  const classes = useStyles();

  const handleChange = (val) => {
    const name = val.target.name;
    const value = val.target.value;
    setDataForm({
      ...dataForm,
      [name]: name === "age" ? parseInt(value) : value,
    });
  };

  const disabled =
    !dataForm.firstName ||
    !dataForm.lastName ||
    !dataForm.age ||
    !dataForm.photo ||
    dataForm.photo === "N/A";

  return (
    <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Create Contact</DialogTitle>

      <DialogContent>
        <TextField
          className={classes.input}
          fullWidth
          value={dataForm.firstName}
          name="firstName"
          onChange={handleChange}
          margin="dense"
          label="First Name"
          variant="outlined"
        />

        <TextField
          className={classes.input}
          fullWidth
          value={dataForm.lastName}
          onChange={handleChange}
          name="lastName"
          margin="dense"
          label="Last Name"
          variant="outlined"
        />

        <TextField
          className={classes.input}
          fullWidth
          value={dataForm.age}
          onChange={handleChange}
          name="age"
          margin="dense"
          label="Age"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <TextField
          className={classes.input}
          value={dataForm.photo}
          onChange={handleChange}
          name="photo"
          fullWidth
          margin="dense"
          label="Link Photo"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          cancel
        </Button>
        <Button
          onClick={() => {
            if (mode === "create") {
              createContact();
            } else {
              editContact();
            }
            close();
          }}
          color="primary"
          autoFocus
          disabled={disabled}
        >
          {mode}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
