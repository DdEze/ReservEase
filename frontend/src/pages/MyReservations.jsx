import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import axios from '../api/axios';
import dayjs from 'dayjs';
import { useSnackbar } from '../context/SnackbarContext';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(null);
  const { showSnackbar } = useSnackbar();

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/reservation/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      showSnackbar('No se pudieron cargar tus reservas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm('¿Estás seguro de cancelar esta reserva?');
    if (!confirm) return;

    setCancelLoading(id);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/reservation/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar('Reserva cancelada correctamente', 'success');
      fetchReservations();
    } catch (err) {
      console.error(err);
      showSnackbar('No se pudo cancelar la reserva', 'error');
    } finally {
      setCancelLoading(null);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>Mis Reservas</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : reservations.length === 0 ? (
        <Typography>No tenés reservas activas.</Typography>
      ) : (
        <List>
          {reservations.map((res) => (
            <ListItem
              key={res._id}
              divider
              secondaryAction={
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancel(res._id)}
                  disabled={cancelLoading === res._id}
                >
                  {cancelLoading === res._id ? <CircularProgress size={20} /> : 'Cancelar'}
                </Button>
              }
            >
              <ListItemText
                primary={`Espacio: ${res.space?.name ?? 'Desconocido'}`}
                secondary={`Fecha: ${dayjs(res.date).format('DD/MM/YYYY')} | ${res.timeStart} - ${res.timeEnd}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MyReservations;