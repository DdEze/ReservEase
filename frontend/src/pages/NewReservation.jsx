import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';

const NewReservation = () => {
  const { spaceId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date');

  const [space, setSpace] = useState(null);
  const [date, setDate] = useState(selectedDate || '');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [note, setNote] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`/spaces/${spaceId}`);
        setSpace(res.data);
      } catch (err) {
        showSnackbar('Error al cargar el espacio', 'error');
      }
    };
    fetchSpace();
  }, [spaceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !timeStart || !timeEnd) {
      return showSnackbar('Por favor completá todos los campos requeridos', 'error');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/reservation', {
        space: spaceId,
        date,
        timeStart,
        timeEnd,
        note,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/reservations');
      showSnackbar('Reserva creada correctamente', 'success');
    } catch (err) {
      console.error(err);
      showSnackbar('No se pudo crear la reserva', 'error');
    }
  };

  if (!space) return <Typography>Cargando espacio...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Reservar: {space.name}</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Fecha"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextField
          label="Hora de inicio"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 1800, min: '08:00', max: '21:00' }}
          value={timeStart}
          onChange={(e) => setTimeStart(e.target.value)}
          error={timeStart && !['00', '30'].includes(timeStart.split(':')[1])}
          helperText={
            timeStart && !['00', '30'].includes(timeStart.split(':')[1])
              ? 'Minutos solo 00 o 30'
              : ''
          }
          required
        />

        <TextField
          label="Hora de fin"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 1800, min: '09:00', max: '22:00' }}
          value={timeEnd}
          onChange={(e) => setTimeEnd(e.target.value)}
          error={
            (timeEnd && timeEnd <= timeStart) ||
            !['00', '30'].includes(timeEnd.split(':')[1])
          }
          helperText={
            timeEnd && timeEnd <= timeStart
              ? 'La hora de fin debe ser posterior'
              : !['00', '30'].includes(timeEnd.split(':')[1])
              ? 'Minutos solo 00 o 30'
              : ''
          }
          required
        />
        <TextField
          label="Nota (opcional)"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Confirmar Reserva
        </Button>
      </Box>
    </Container>
  );
};

export default NewReservation;