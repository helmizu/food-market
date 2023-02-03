import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import HistoryIcon from '@mui/icons-material/HistoryRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuthContext } from '../utils/AuthProvider';
import { Badge, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../utils/functions/cart';
import { getUserLocation } from '../utils/storage';
import { reverseGeocode } from '../utils/functions/geolocation';

export default function Header() {
  const { auth, signout } = useAuthContext();
  const { latitude = '', longitude = '' } = getUserLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [city, setCity] = React.useState('Unknown');
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

  const mapLocation = async () => {
    try {
      const location = await reverseGeocode(`${latitude},${longitude}`);
      setCity(location.city)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (latitude && longitude) mapLocation();
  }, [])

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
        <Box width={400}>
          <Typography variant="h6" component="div" sx={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Food Market
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={1} alignItems="center" justifyContent="center" flexGrow={1}>
          <LocationOnIcon color="error" sx={{ mt: '-4px' }} />
          <Typography>{city}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" width={400} justifyContent="flex-end" alignItems="center">
          {!!auth && (
            <IconButton
              size="large"
              onClick={() => navigate('/order')}
              color="inherit"
            >
              <Badge color="primary" variant="dot" invisible={!items.length}>
                <HistoryIcon />
              </Badge>
            </IconButton>
          )}
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
            <Box display="flex" flexDirection="row" gap={1} alignItems="center">
              <Typography ml={1}>{auth.email}</Typography>
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
            </Box>
          )}
          {!auth && (
            <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar >
  );
}
