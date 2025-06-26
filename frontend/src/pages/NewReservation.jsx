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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`/spaces/${spaceId}`);
        setSpace(res.data);
      } catch (err) {
        setError('Error al cargar el espacio');
      }
    };
    fetchSpace();
  }, [spaceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !timeStart || !timeEnd) {
      return setError('Por favor completá todos los campos requeridos');
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
    } catch (err) {
      console.error(err);
      setError('No se pudo crear la reserva');
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
          value={timeStart}
          onChange={(e) => setTimeStart(e.target.value)}
          required
        />
        <TextField
          label="Hora de fin"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={timeEnd}
          onChange={(e) => setTimeEnd(e.target.value)}
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