import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
// import { Navigate, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';
import Header from './Header';
// import { useAuthContext } from '../utils/AuthProvider';
import { setUserLocation } from '../utils/storage';

export default function Layout() {
  // const { auth } = useAuthContext();
  // if (!auth) {
  //   return <Navigate to='/login' replace />
  // }

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  React.useEffect(() => {
    if (coords) {
      setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
    }
  }, [coords?.latitude, coords?.longitude]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
