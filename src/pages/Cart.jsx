import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardCart from '../components/CardCart';
import { useAuthContext } from '../utils/AuthProvider';
import { formatToIdr } from '../utils/formatter';
import { addToCart, getCart } from '../utils/functions/cart';
import { getRestaurant } from '../utils/functions/restaurant';
import { addTransaction } from '../utils/functions/transaction';
import { deleteUserCart } from '../utils/storage';

const useCart = () => {
  const { auth } = useAuthContext();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ id: '', items: [] });
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const transactions = cart.items.map(item => ({ ...item, subtotal: item.qty * item.price }))
  const totalProductPrice = transactions.reduce((prev, curr) => (prev + curr.subtotal), 0);
  const otherPrice = 15000;

  const getDataRestaurant = async () => {
    try {
      const { id = '' } = getCart();
      const data = await getRestaurant(id);
      setRestaurant(data);
    } catch (error) {
      console.log(error);
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

  const checkout = async () => {
    try {
      setLoading(true);
      const payload = {
        uid: auth.uid,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
        restaurantCity: restaurant.city,
        restaurantAddress: restaurant.address,
        transactions,
        totalProductPrice,
        otherPrice,
        total: totalProductPrice + otherPrice,
      };
      const doc = await addTransaction(payload)
      if (doc.id) {
        setDialogSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataRestaurant();
    getCartFromStorage();
  }, [])

  return {
    restaurant,
    cart,
    cartItems: cart.items || [],
    updateCart,
    loading,
    transactions,
    totalProductPrice,
    otherPrice,
    checkout,
    dialogSuccess,
    closeDialog: () => setDialogSuccess(false),
  }
}

const Cart = () => {
  const { restaurant, transactions, cartItems, updateCart, totalProductPrice, otherPrice, checkout, dialogSuccess, closeDialog } = useCart();
  const navigate = useNavigate()

  const onCloseDialog = () => {
    closeDialog();
    navigate('/');
    deleteUserCart();
  }

  return (
    <Container>
      <section>
        <Box py={3}>
          <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
              <Box component={Paper} p={3}>
                <Typography variant="h6" mb={2}>Item Ordered</Typography>
                <Stack spacing={3}>
                  {cartItems.map(item => (
                    <CardCart
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.imageUrl}
                      qty={cartItems.find(cart => cart.id === item.id)?.qty || 0}
                      onChangeQty={(_qty) => updateCart({ ...item, qty: _qty })}
                    />
                  ))}
                </Stack>
                <Box display="flex" pt={3} alignItems="flex-end" justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>Add more</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box component={Paper} p={3}>
                <Typography variant="h6" mb={1}>Details Transaction</Typography>
                {transactions.map(t => (
                  <Stack key={t.name} direction="row" alignItems="center" justifyContent="space-between" py={1}>
                    <Typography variant="subtitle1" fontWeight={500}>{t.name}</Typography>
                    <Typography variant="body1">{formatToIdr(t.subtotal)}</Typography>
                  </Stack>
                ))}
                <Stack direction="row" alignItems="center" justifyContent="space-between" py={1}>
                  <Typography variant="subtitle1" fontWeight={500}>Others (Delivery, Tax, etc)</Typography>
                  <Typography variant="body1">{formatToIdr(otherPrice)}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between" py={1} mb={2}>
                  <Typography variant="subtitle1" fontWeight={500}>Total Price</Typography>
                  <Typography variant="body1" color="info.main">{formatToIdr(totalProductPrice + otherPrice)}</Typography>
                </Stack>
                <Button variant="contained" fullWidth onClick={checkout}>
                  Checkout
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>

      <Dialog
        open={dialogSuccess}
        onClose={onCloseDialog}
        maxWidth="xs"
      >
        <DialogTitle>
          Ordered!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been received and processed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Cart;
