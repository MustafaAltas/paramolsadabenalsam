/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { kullaniciCikis } from "../firebase/firebase";
import Basket from "./Basket";
import "./style.css";

export default function MenuAppBar() {
  const { width, setWidth } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setState, currentUser } = React.useContext(AppContext);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeft = () => {
    setState(true);
  };

  const handleLogin = () => {
    navigate("/login");
    setAnchorEl(null);
  };
  const handleRegiter = () => {
    navigate("/register");
    setAnchorEl(null);
  };
  const handleLogout = () => {
    kullaniciCikis();
    setAnchorEl(null);
  };
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize);
  },[]);
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0A1931",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleLeft}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Avatar
              alt="my logo"
              src={logo}
              sx={{ width: 100, height: 100 }}
            />
          </Typography> */}
          <Typography
          variant={(width >= 500 && width <800) ? ("h5"):(width >= 800) ? ("h3") : ("p")}
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Patrick Hand, cursive",
              color: "pink",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
            className="header"
          >
            paramolsadabenalsam.com
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {!currentUser ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogin}>login</MenuItem>
                <MenuItem onClick={handleRegiter}>Register</MenuItem>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            )}
          </div>
          {currentUser && currentUser.displayName}
          {currentUser && <Basket />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
