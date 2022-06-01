import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { bilgiMesaj } from "../helper/toast";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function BasketDetailCard({ item }) {
  const { setBasketScore, currentUser, basketScore, setPriceProduct} =
    React.useContext(AppContext);
  const baseUrl = "http://e-commarce-fake-backend.herokuapp.com/";
  const handleDelete = async (id) => {
    await axios
      .delete(baseUrl + "basket/" + id)
      .then((result) => {
        setBasketScore(result.data.filter((i) => i.user === currentUser.email));
      })
      .catch((err) => {});
    await bilgiMesaj("Ürün Silindi !!! :(");
    await axios
      .get(baseUrl + "basket")
      .then((result) => {
        setBasketScore(
          result.data.filter((item) => item.user === currentUser?.email)
        );
      })
      .catch((err) => {
        console.log(err);
      });

  };
  React.useEffect(() => {
    let x = 0
    for (const i of basketScore) {
      x += parseFloat(i.product.price)
      console.log(i);
      setPriceProduct(x)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[basketScore])

  return (
    <Paper
      sx={{
        p: 2,
        margin: "1rem auto",
        maxWidth: 500,
        width: "500px",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item?.product.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.product.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.product.price}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="error" onClick={(e) => handleDelete(item.id)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
