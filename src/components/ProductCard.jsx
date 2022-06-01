import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { bilgiMesaj } from "../helper/toast";

export default function ProductCard({ item }) {
  const { forBasketUrl, baseUrl, currentUser, setBasketScore } =
    React.useContext(AppContext);
  const navigate = useNavigate();

  const handleBasket = async (id) => {
    const currentUrl = await (forBasketUrl + id);
    await axios
      .get(currentUrl)
      .then((result) => {
        fetch(baseUrl + "basket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: currentUser.email,
            product: result.data,
            isDetail: id,
            piece: 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
          })
          .catch((error) => {
            console.error("Error:", error);

          });
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(baseUrl + "basket")
      .then((result) => {
        // for (const i of basketScore) {
        //   if (i.idDetail === id) {
        //     console.log("OLmaz");
        //   } else {

        //   }
        // }
        setBasketScore(
          result.data.filter((item) => item.user === currentUser.email)
        );
        bilgiMesaj("Ürün Eklendi :)")
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    axios
      .get(baseUrl + "basket")
      .then((result) => {
        setBasketScore(
          result.data.filter((item) => item.user === currentUser?.email)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
      <CardMedia
        component="img"
        height="300"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {item.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="p" color="text.secondary">
          {item.price} TL
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip disableFocusListener disableTouchListener title="Basket Page">
          <IconButton
            aria-label="add to basket"
            onClick={() => handleBasket(item.id)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener disableTouchListener title="Detail Page">
          <IconButton
            aria-label="read more"
            onClick={() => navigate("/paramolsadabenalsam-altas/detail", { state: { item } })}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
