/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { AppContext } from "../context/AppContext";
import NotFound from "./NotFound";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { olumsuzMesaj, onayMesaj } from "../helper/toast";

function Detail() {
  const location = useLocation();
  const [detail, setDetail] = useState();
  const { currentUser, width, baseUrl } = useContext(AppContext);
  const [comment, setComment] = useState("");
  const [commentEnd, setCommentEnd] = useState();
  const forCommentUrl = baseUrl + "comments";
  const showComment = () => {
    axios
      .get(forCommentUrl)
      .then((result) => {
        setCommentEnd(result.data);
      })
      .catch((err) => {});
  };

  const handleSubmit = (id) => {
    const forComment = {
      idDetail: detail.id,
      user: currentUser.displayName,
      text: comment,
    };

    if (comment !== "") {
      fetch(forCommentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forComment),
      })
        .then((response) => response.json())
        .then((data) => {
          onayMesaj(`"${data.text}" yorumunuz eklendi`);
          showComment();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      olumsuzMesaj("Yorumunuzu Girmediniz");
    }

    setComment("");
  };

  useEffect(() => {
    setDetail(location.state.item);
  }, [location]);

  useEffect(() => {
    showComment();
  }, []);

  return (
    <div>
      {currentUser ? (
        <Container maxWidth="md">
          <Box
            sx={{
              minHeight: "100vh",
              padding: "2rem",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={detail?.image}
                    alt=""
                    width={width > 800 ? "500px" : "300px"}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", padding: "1rem" }}
                >
                  {detail?.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", padding: "1rem" }}
                >
                  {detail?.price}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Comment"
                    style={{ width: 200, height: 200, resize: "none" }}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleSubmit(detail.id)}
                  >
                    Comment
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <NotFound />
      )}

      {currentUser && (
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ textAlign: "center", padding: "1rem" }}
          >
            Yorumlar
          </Typography>
          {commentEnd
            ?.filter((item) => item.idDetail === detail.id)
            .map((item2) => {
              return (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 720,
                    bgcolor: "background.paper",
                    margin: "1rem auto",
                  }}
                  key={item2.id}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item2.user}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {item2.text}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              );
            })}
        </Container>
      )}
    </div>
  );
}

export default Detail;
