import React, { useEffect, useState } from 'react'
import { Box, Chip, Container, Grid, Stack, Tab, Tabs, Typography, Badge, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoneyIcon from '@mui/icons-material/AttachMoneyRounded';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardMenu from '../components/CardMenu';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthProvider';
import { getTransactionsByUser, updateTransactionStatus } from '../utils/functions/transaction';
import CardOrder from '../components/CardOrder';

const useOrder = () => {
  const { auth } = useAuthContext();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const orderOnProgress = order.filter(item => item.status === "In Progress" || !item.status);
  const orderDone = order.filter(item => item.status === "Completed" || item.status === 'Cancelled');

  const getDataOrder = async () => {
    try {
      setLoading(true);
      const data = await getTransactionsByUser(auth.uid);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await updateTransactionStatus(id, status);
      getDataOrder();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataOrder();
  }, [])

  return {
    orderOnProgress,
    orderDone,
    loading,
    updateStatus,
  }
}

const Order = () => {
  const [tab, setTab] = React.useState("progress");

  const {
    orderOnProgress,
    orderDone,
    loading,
    updateStatus,
  } = useOrder();
  console.log({ loading, orderOnProgress, orderDone })

  return (
    <Container>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Your Order
      </Typography>

      <section>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', my: 2 }}>
          <Tabs value={tab} onChange={(_e, val) => setTab(val)}>
            <Tab label="In Progress" value="progress" />
            <Tab label="Past Orders" value="done" />
          </Tabs>
        </Box>

        {tab === 'progress' && (
          <Stack spacing={2}>
            {orderOnProgress.map(item => (
              <CardOrder
                key={item.id}
                name={item.restaurantName}
                image={item.restaurantImage}
                items={item.transactions}
                totalPrice={item.total}
                status={item.status}
                onUpdateStatus={(newStatus) => updateStatus(item.id, newStatus)}
                createdAt={item.createdAt}
              />
            ))}
          </Stack>
        )}


        {tab === 'done' && (
          <Stack spacing={2}>
            {orderDone.map(item => (
              <CardOrder
                key={item.id}
                name={item.restaurantName}
                image={item.restaurantImage}
                items={item.transactions}
                totalPrice={item.total}
                status={item.status}
                onUpdateStatus={(newStatus) => updateStatus(item.id, newStatus)}
                updatedAt={item.updatedAt}
              />
            ))}
          </Stack>
        )}
        {/* {menuMapped.map(section => (
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
        ))} */}
      </section>
    </Container >
  )
}

export default Order