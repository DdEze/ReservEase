import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewReservation = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`/api/spaces/${spaceId}`);
        setSpace(res.data);
      } catch (err) {
        setError('Error al cargar el espacio');
      }
    };
    fetchSpace();
  }, [spaceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      return setError('Por favor completá la fecha y hora');
    }

    try {
      await axios.post('/api/reservation', {
        space: spaceId,
        date,
        time,
      });

      navigate('/reservations');
    } catch (err) {
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
        />
        <TextField
          label="Hora"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Confirmar Reserva
        </Button>
      </Box>
    </Container>
  );
};

export default NewReservation;