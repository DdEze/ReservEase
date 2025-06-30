import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      showSnackbar('¡Inicio de sesión exitoso!', 'success');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error al iniciar sesión';
      showSnackbar(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
          ReservEase
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 3,
          bgcolor: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          ¿No tenés una cuenta?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Registrate acá
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;