import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Button } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

import CardContact from "../component/CardContact";
import ModalCreate from "../component/ModalCreate";
import ModalConfrimDdelete from "../component/ModalConfirmDelete";

const apiURL = "https://simple-contact-crud.herokuapp.com";

function Home() {
  const [contact, setContact] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    age: 0,
  });
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    onOk: null,
    text: "",
  });

  const classes = useStyles();

  //get all data contact
  const getContacts = async () => {
    setLoading(true);

    const dataContact = await axios
      .get(`${apiURL}/contact`)
      .then(function (res) {
        const data = res?.data?.data;
        setContact(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    return dataContact;
  };

  // create new contact
  const createContact = async (value) => {
    await axios
      .post(`${apiURL}/contact`, dataForm)
      .then(function (res) {
        getContacts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //delete contact
  const deleteContact = async (id) => {
    await axios
      .delete(`${apiURL}/contact/${id}`)
      .then(function (res) {
        getContacts();
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  //edit contact
  const editContact = async () => {
    setLoading(true);

    const id = dataForm.id;
    const newUpdate = { ...dataForm };

    delete newUpdate.id;

    await axios
      .put(`${apiURL}/contact/${id}`, newUpdate)
      .then(function (res) {
        setLoading(false);
        getContacts();
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  // find contact by name
  const getSearch = () => {
    if (!searchText) return contact;

    const getFullName = contact.map((item) => {
      return { ...item, name: item.firstName + item.lastName };
    });

    return getFullName.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 100,
        padding: 10,
        flexDirection: "column",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search name"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
              setMode("create");
            }}
            style={{
              textTransform: "none",
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress disableShrink />
      ) : (
        <Grid container spacing={2}>
          {Array.from(getSearch() || []).map((item) => (
            <Grid item xs={3} alignItems="stretch">
              <CardContact
                data={item}
                deleteContact={deleteContact}
                setDataForm={setDataForm}
                setOpenModal={setOpenModal}
                setMode={setMode}
                setConfirmDelete={setConfirmDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {openModal && (
        <ModalCreate
          open={openModal}
          close={() => {
            setOpenModal(false);
            setDataForm({ firstName: "", lastName: "", photo: "", age: 0 });
          }}
          setDataForm={setDataForm}
          dataForm={dataForm}
          createContact={createContact}
          mode={mode}
          editContact={editContact}
        />
      )}
      {confirmDelete.open && (
        <ModalConfrimDdelete
          confirmDelete={confirmDelete}
          close={() => setConfirmDelete((prev) => ({ ...prev, open: false }))}
        />
      )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid lightgray",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default Home;
