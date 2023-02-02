import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CardExplorer from '../components/CardExplorer';
import CardRestaurant from '../components/CardRestaurant';
import { getRestaurants } from '../utils/functions/restaurant';

const useHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return {
    restaurants,
    loading,
  }
}

const Home = () => {
  const { restaurants } = useHome();
  return (
    <Container>
      <section>
        <Typography textAlign="center" variant="h4" my={1} component="div">Let’s get some foods</Typography>
        <Box py={3}>
          <Grid container spacing={2}>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Terdekat" image="/icons/near.png" url="" />
            </Grid>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Terlaris" image="/icons/ondemand.png" url="" />
            </Grid>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Promo" image="/icons/promo.png" url="" />
            </Grid>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Terfavorit" image="/icons/favorite.png" url="" />
            </Grid>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Baru Minggu Ini" image="/icons/new.png" url="" />
            </Grid>
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <CardExplorer text="Menu Sehat" image="/icons/healthy.png" url="" />
            </Grid>
          </Grid>
        </Box>
      </section>

      <section>
        <Typography textAlign="center" variant="h4" my={2} component="div">Explore our partner!</Typography>
        <Box py={3}>
          <Grid container spacing={3}>
            {restaurants.map(item => (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <CardRestaurant
                  name={item.name}
                  rating={item.rating || 0}
                  distance={item.distance}
                  city={item.city}
                  image={item.imageUrl}
                  url={`/restaurant/${item.id}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
    </Container>
  )
}

export default Home;
