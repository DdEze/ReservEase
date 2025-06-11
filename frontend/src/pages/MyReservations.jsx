import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  ListItemSecondaryAction
} from '@mui/material';
import axios from 'axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
        try {
        const response = await axios.get('/api/reservation/my');
        if (Array.isArray(response.data)) {
            setReservations(response.data);
        } else {
            setReservations([]);
        }
        } catch (error) {
        setReservations([]);
        }
    };

    fetchReservations();
    }, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/reservation/${id}`);
    setReservations(reservations.filter((res) => res._id !== id));
  } catch (err) {
    setError('Error al cancelar la reserva');
  }
};

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mis Reservas
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {reservations.length === 0 ? (
        <Typography variant="body1">No tenés reservas aún.</Typography>
      ) : (
        <List>
          {reservations.map((res) => (
            <React.Fragment key={res._id}>
              <ListItem>
                <ListItemText
                  primary={res.space?.name || 'Espacio eliminado'}
                  secondary={`Fecha: ${res.date} - Hora: ${res.time}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDelete(res._id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MyReservations;