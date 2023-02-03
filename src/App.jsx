import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './config/theme';
import { initializeProject } from './config/firebase';
import AuthProvider from './utils/AuthProvider';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/restaurant',
        element: <Restaurant />,
      },
      {
        path: '/restaurant/:id',
        element: <Restaurant />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
])

// initialize firebase
initializeProject();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
