import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AppContext } from "../context/AppContext";
import NotFound from "./NotFound";
import Stack from "@mui/material/Stack";
import BasketDetailCard from "./BasketDetailCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
function BasketDetail() {
  const { basketScore, currentUser, priceProduct } = useContext(AppContext);
  console.log(basketScore.length);
  return (
    <div>
      <Container>
        {currentUser ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{ bgcolor: "#cfe8fc", height: "100vh", overflow: "auto" }}
              >
                {basketScore?.map((item) => {
                  return (
                    <Stack key={item.id}>
                      <BasketDetailCard item={item} />
                    </Stack>
                  );
                })}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#cfe8fc",
                  height: "50vh",
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap:"1rem"
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">₺</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Fiyat
                        </TableCell>
                        <TableCell align="right">
                          {basketScore.length > 0 ? priceProduct.toFixed(2) : 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          KDV
                        </TableCell>
                        <TableCell align="right">
                          {basketScore.length > 0
                            ? (priceProduct * 0.18).toFixed(2)
                            : 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Toplam Fiyat
                        </TableCell>
                        <TableCell align="right">
                          {basketScore.length > 0
                            ? (
                                parseFloat((priceProduct * 0.18).toFixed(2)) +
                                parseFloat(priceProduct.toFixed(2))
                              ).toFixed(2)
                            : 0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="contained" color="success">
                  Satın Al
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </Container>
    </div>
  );
}

export default BasketDetail;
