import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, setUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido{user?.surname ? `, ${user.surname} ${user.name}` : ''}!
        </Typography>
        <Typography variant="body1" gutterBottom>
           Bienvenido al sistema de reservas. Aquí podés buscar espacios disponibles, ver tus reservas activas o cancelar alguna si lo necesitás. 
  Si tenés alguna duda, contactanos.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;