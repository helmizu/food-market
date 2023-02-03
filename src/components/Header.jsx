import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuthContext } from '../utils/AuthProvider';
import { Badge, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../utils/functions/cart';

export default function Header() {
  const { auth, signout } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { items = [] } = getCart();

  const handleLogout = () => {
    signout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: (theme) => theme.palette.common.black,
        bgcolor: (theme) => theme.palette.common.white,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Food Market
        </Typography>
        <IconButton
          size="large"
          onClick={() => navigate('/cart')}
          color="inherit"
        >
          <Badge color="primary" variant="dot" invisible={!items.length}>
            <CartIcon />
          </Badge>
        </IconButton>
        {!!auth && (
          <div>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        {!auth && (
          <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
