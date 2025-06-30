import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          bgcolor: 'white',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          ¡Bienvenido{user?.surname ? `, ${user.surname} ${user.name}` : ''}!
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.primary', mt: 2 }}>
          Bienvenido al sistema de reservas de espacios. Aquí podés buscar espacios disponibles, ver tus reservas activas o cancelar alguna si lo necesitás.
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          Si tenés alguna duda, no dudes en contactarnos.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;