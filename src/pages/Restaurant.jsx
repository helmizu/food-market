import React, { useEffect, useState } from 'react'
import { Box, Chip, Container, Grid, Stack, Tab, Tabs, Typography, Badge, IconButton } from '@mui/material'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoneyIcon from '@mui/icons-material/AttachMoneyRounded';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardMenu from '../components/CardMenu';
import { getMenuByRestaurant } from '../utils/functions/menu';
import { useParams } from 'react-router-dom';
import { getArrayUnique, getPriceRange } from '../utils/formatter';
import { addToCart, getCart } from '../utils/functions/cart';
import { getRestaurant } from '../utils/functions/restaurant';

const useRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ id: '', items: [] });
  const [dialogResetCart, setDialogResetCart] = useState(false);
  const { id = '' } = useParams();
  const menuTypes = getArrayUnique(menu.map(item => item.type))
  const menuMapped = menuTypes.map(type => ({ label: type, data: menu.filter(item => item.type === type) }));
  const prices = menu.map(item => item.price)

  const getDataRestaurant = async () => {
    try {
      setLoading(true);
      const data = await getRestaurant(id);
      setRestaurant(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const getDataMenu = async () => {
    try {
      setLoading(true);
      const data = await getMenuByRestaurant(id);
      setMenu(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const getCartFromStorage = () => {
    try {
      const storageCart = getCart();
      setCart(storageCart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = (data) => {
    const existingCart = getCart();
    if (!existingCart.id) {
      addToCart(data);
      getCartFromStorage();
    } else if (existingCart.id !== data.restaurantId) {
      console.log('reset')
      setDialogResetCart(true);
    } else {
      addToCart(data);
      getCartFromStorage();
    }
  }

  useEffect(() => {
    getDataRestaurant();
    getDataMenu();
    getCartFromStorage();
  }, [])

  return {
    restaurant,
    menu,
    menuTypes: menuTypes.join(', '),
    priceRange: getPriceRange(prices).join('-'),
    menuMapped,
    cart,
    updateCart,
    dialogResetCart,
    loading,
  }
}

const Restaurant = () => {
  const [tab, setTab] = React.useState(0);

  const { restaurant, menuTypes, priceRange, menuMapped, loading, cart, updateCart } = useRestaurant();
  const cartItems = cart.items || [];
  console.log({ loading, restaurant })

  return (
    <Container>
      <section>
        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2}>
          <Box flexGrow={1}>
            <Typography variant="h5" fontWeight={600} mb={2}>
              {restaurant.name}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems={{ sx: 'flex-start', sm: "center" }}
              mb={1.5}
            >
              <Chip
                icon={<ThumbUpRoundedIcon sx={{ fontSize: 14 }} />}
                label="Recommended"
                color="warning"
                sx={{ fontSize: 14, fontWeight: 600, pl: 1, width: 'fit-content' }}
              />
              <Typography color="text.secondary">
                {menuTypes}
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems={{ sx: 'flex-start', sm: "center" }}
              mb={1.5}
            >
              <Chip
                icon={<CircleIcon sx={{ fontSize: 10 }} />}
                label="Open"
                color="success"
                variant="outlined"
                sx={{ fontSize: 14, fontWeight: 600, pl: 1, width: 'fit-content' }}
              />
              <Typography color="text.secondary">
                {restaurant.address}
              </Typography>
            </Stack>

            <Grid container alignItems={{ sx: 'flex-start', sm: "center" }} spacing={2}>
              <Grid item xs={4} sm="auto">
                <Stack spacing={1} py={1} alignItems="center">
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ height: 24, width: 84 }}>
                    <StarRoundedIcon color="warning" fontSize="small" sx={{ mt: '-2px' }} />
                    <Typography component="div" variant="body2" fontWeight={600}>
                      {restaurant.rating}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">Rating</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} sm="auto">
                <Stack spacing={1} py={1} alignItems="center">
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ height: 24, width: 84 }}>
                    <LocationOnIcon color="error" fontSize="small" sx={{ mt: '-2px' }} />
                    <Typography component="div" variant="body2" fontWeight={600}>
                      {restaurant.distance}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">Distance</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} sm="auto">
                <Stack spacing={1} py={1} alignItems="center">
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ height: 24, width: 84 }}>
                    <MoneyIcon fontSize="small" sx={{ mt: '-2px' }} />
                    <Typography component="div" variant="body2" fontWeight={600}>
                      {priceRange}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">Price</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box height={100} width={100} borderRadius="8px" bgcolor="lightgrey" overflow="none">
            <img src={restaurant.imageUrl} alt={restaurant.name} width="100px" height="100px" style={{ borderRadius: '8px' }} />
          </Box>
        </Stack>
      </section>


      <section>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', my: 2 }}>
          <Tabs value={tab} onChange={setTab} centered>
            <Tab label="Menu" />
          </Tabs>
        </Box>

        {menuMapped.map(section => (
          <Box key={section.label} mb={4}>
            <Typography variant="h6" py={1}>{section.label}</Typography>
            <Grid container spacing={3}>
              {section.data.map(item => (
                <Grid item md={4} sm={6} xs={12} key={item.id}>
                  <CardMenu
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.imageUrl}
                    qty={cartItems.find(cart => cart.id === item.id)?.qty || 0}
                    onChangeQty={(_qty) => updateCart({ ...item, qty: _qty })}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}


      </section>
      <Box sx={{ position: 'fixed', right: 40, bottom: 40 }}>
        <Badge color="primary" overlap="circular" badgeContent={1}>
          <IconButton size="large" sx={{ bgcolor: 'error.main', color: 'common.white', boxShadow: theme => theme.shadows[2], '&:hover': { color: 'error.main' } }}>
            <CartIcon />
          </IconButton>
        </Badge>
      </Box>
    </Container >
  )
}

export default Restaurant