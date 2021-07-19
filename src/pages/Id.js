import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";

const apiURL = "https://simple-contact-crud.herokuapp.com";

function Id() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  //get data contact
  const getContact = async () => {
    setLoading(true);

    const dataContact = await axios
      .get(`${apiURL}/contact/${id}`)
      .then(function (res) {
        const data = res?.data?.data;
        setContact(data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });

    return dataContact;
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <IconButton
        aria-label="back"
        className={classes.back}
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon />
      </IconButton>
      {loading ? (
        <CircularProgress disableShrink />
      ) : (
        <Card className={classes.root}>
          {contact.photo !== "N/A" ? (
            <CardMedia
              className={classes.media}
              image={contact?.photo}
              title={contact?.firstName}
            />
          ) : (
            <div className={classes.wrapNoMedia}>
              {contact?.firstName.substring(0, 1)}{" "}
              {contact?.lastName.substring(0, 1)}
            </div>
          )}

          <CardContent>
            <Typography style={{ fontSize: 10, color: "#949494" }}>
              Name
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {contact?.firstName} {contact?.lastName}
            </Typography>
            <Typography style={{ fontSize: 10, color: "#949494" }}>
              Age
            </Typography>
            <Typography variant="body2" component="p">
              {contact?.age}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 545,
    minWidth: 240,
  },
  media: {
    height: 180,
    width: 240,
  },
  wrapNoMedia: {
    height: 180,
    width: "100%",
    background: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 35,
    fontWeight: 700,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 50,
  },
});

export default Id;
