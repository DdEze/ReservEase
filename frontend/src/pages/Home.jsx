import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido{user?.surname ? `, ${user.name} ${user.surname}` : ''}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Este es tu panel de control. Pronto vas a poder ver tus reservas o crear nuevas.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 4 }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Home;