import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  wrapNoMedia: {
    height: 140,
    width: "100%",
    background: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 35,
    fontWeight: 700,
  },
});

export default function MediaCard({
  data,
  deleteContact,
  setOpenModal,
  setDataForm,
  setMode,
  setConfirmDelete,
}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/${data.id}`)}>
        {data.photo !== "N/A" ? (
          <CardMedia
            className={classes.media}
            image={data?.photo}
            title={data?.firstName}
          />
        ) : (
          <div className={classes.wrapNoMedia}>
            {data?.firstName.substring(0, 1)} {data?.lastName.substring(0, 1)}
          </div>
        )}

        <CardContent>
          <Typography style={{ fontSize: 10, color: "#949494" }}>
            Name
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {data?.firstName} {data?.lastName}
          </Typography>
          <Typography style={{ fontSize: 10, color: "#949494" }}>
            Age
          </Typography>
          <Typography variant="body2" component="p">
            {data?.age}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            setConfirmDelete({
              open: true,
              text: "Are you sure want delete this record?",
              onOk: () => {
                deleteContact(data.id);
              },
              onCancel: () => {
                setConfirmDelete((prev) => ({ ...prev, open: false }));
              },
            });
          }}
          size="small"
          variant="contained"
          style={{
            background: "#ff4e8d",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{
            textTransform: "none",
          }}
          onClick={() => {
            setDataForm(data);
            setOpenModal(true);
            setMode("edit");
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
