import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', form);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Ingresar</Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tenés una cuenta?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Registrate acá
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;