import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import getDistance from 'geolib/es/getDistance';
import { getUserLocation } from '../utils/storage';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.5)' }}
  >
    •
  </Box>
);

const CardRestaurant = ({ image, name, rating, latlng, city, url }) => {
  const userCoords = getUserLocation();
  const restoCoords = latlng ? { latitude: latlng.split(',')[0], longitude: latlng.split(',')[1] } : null;
  const distanceInMeters = restoCoords && userCoords ? getDistance(userCoords, restoCoords) : 0;
  const distance = distanceInMeters ? `${(distanceInMeters / 1000).toFixed(1)} km` : city;

  return (
    <Link to={url}>
      <Card>
        <CardMedia
          sx={{ height: 160, bgcolor: !image ? 'secondary.light' : 'transparent' }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ display: 'inline-flex', gap: 0.5 }} component="div">
            <StarRoundedIcon color="warning" fontSize='small' /> {rating} {bull} {distance}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardRestaurant;
