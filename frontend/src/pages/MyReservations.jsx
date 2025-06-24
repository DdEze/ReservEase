import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Button,
  Box
} from '@mui/material';
import axios from '../api/axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/reservation/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error al obtener reservas:', err);
      setError('No se pudieron cargar tus reservas');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm('¿Estás seguro de cancelar esta reserva?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/reservation/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Reserva cancelada correctamente');
      fetchReservations();
    } catch (err) {
      console.error(err);
      setError('No se pudo cancelar la reserva');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Mis Reservas</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <List>
        {reservations.length === 0 ? (
          <Typography>No tenés reservas activas.</Typography>
        ) : (
          reservations.map((res) => (
            <ListItem key={res._id} divider>
              <ListItemText
                primary={`Espacio: ${res.space?.name ?? 'Desconocido'}`}
                secondary={`Fecha: ${new Date(res.date).toLocaleDateString()} | ${res.timeStart} - ${res.timeEnd}`}
              />
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancel(res._id)}
                >
                  Cancelar
                </Button>
              </Box>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default MyReservations;