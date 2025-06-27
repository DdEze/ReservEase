import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

const Register = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      showSnackbar('¡Registro exitoso! Ahora podés iniciar sesión.', 'success');
      navigate('/login');
    } catch (err) {
      const mensaje = err.response?.data?.msg || 'Error al registrar';
      showSnackbar(mensaje, 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Registro</Typography>
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