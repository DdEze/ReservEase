import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrar');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Registro</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Nombre" name="name" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Apellido" name="surname" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Registrarse</Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tenés una cuenta?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Iniciá sesión
        </Link>
      </Typography>
      </Box>
    </Container>
  );
};

export default Register;