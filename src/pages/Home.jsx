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
            <Grid item xs={2}>
              <CardExplorer text="Terdekat" image="/icons/near.png" url="" />
            </Grid>
            <Grid item xs={2}>
              <CardExplorer text="Terlaris" image="/icons/ondemand.png" url="" />
            </Grid>
            <Grid item xs={2}>
              <CardExplorer text="Promo" image="/icons/promo.png" url="" />
            </Grid>
            <Grid item xs={2}>
              <CardExplorer text="Terfavorit" image="/icons/favorite.png" url="" />
            </Grid>
            <Grid item xs={2}>
              <CardExplorer text="Baru Minggu Ini" image="/icons/new.png" url="" />
            </Grid>
            <Grid item xs={2}>
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
              <Grid item xs={3}>
                <CardRestaurant
                  name={item.name}
                  rating={item.rating || 0}
                  latlng={item.latlng || ''}
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
