import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          ReservEase
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/spaces">Espacios</Button>
          <Button color="inherit" component={Link} to="/reservations">Reservas</Button>
          <Button color="inherit" component={Link} to="/calendar">Calendario</Button>

          {/* BOTONES EXCLUSIVOS PARA ADMIN */}
          {user.role === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/admin/spaces">Gestionar espacios</Button>
              <Button color="inherit" component={Link} to="/admin/usuarios">Usuarios</Button>
            </>
          )}

          <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;