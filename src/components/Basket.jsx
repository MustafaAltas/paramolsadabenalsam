import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Basket() {
  const navigate = useNavigate();
  const {basketScore} = React.useContext(AppContext);
  return (
    <IconButton aria-label="cart" onClick={() => navigate("/paramolsadabenalsam-altas/basket")}>
      <StyledBadge badgeContent={basketScore?.length} color="secondary">
        <ShoppingCartIcon sx={{color:"white"}}/>
      </StyledBadge>
    </IconButton>
  );
}