import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../utils/AuthProvider';

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
}).required();

const Login = () => {
  const { auth, signin, singining } = useAuthContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    signin(data)
  };
  
  if (!!auth) {
    return <Navigate to="/" replace />
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Header auth={false} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} textAlign="center">
          <Typography variant="h5">Welcome to Food Market</Typography>
          <Typography variant="body1" pb={6}>Sign in to get full access</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Email"
                sx={{ width: 300 }}
                color="info"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Password"
                sx={{ width: 300 }}
                color="info"
                type="password"
              />
            )}
          />
          <Button type="submit" variant='outlined' disabled={singining}>
            Sign in
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Login