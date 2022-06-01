import { Drawer, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GiTrousers } from "react-icons/gi";
import { GiPirateCoat } from "react-icons/gi";
import { GiBallerinaShoes } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { FaSocks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Main() {
  const {state,setState,setCategory} = useContext(AppContext);
  const navigate = useNavigate()
  const handleCategory = (e) => {
    setCategory(e.target.innerText);
    setState(false)
    navigate("/")
  }
  return (
    <div>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation"></Box>
        <Typography variant="h6" component="div" textAlign="center">
          Side Panel
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCategory}>
              <ListItemIcon>
                <GiTrousers />
              </ListItemIcon>
              <ListItemText primary="Trousers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCategory}>
              <ListItemIcon>
                <GiBallerinaShoes />
              </ListItemIcon>
              <ListItemText primary="Shoes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCategory}>
              <ListItemIcon>
                <FaTshirt />
              </ListItemIcon>
              <ListItemText primary="T-shirt" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCategory}>
              <ListItemIcon>
                <GiPirateCoat />
              </ListItemIcon>
              <ListItemText primary="Coats" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCategory}>
              <ListItemIcon>
                <FaSocks />
              </ListItemIcon>
              <ListItemText primary="Socks" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Main;
