import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent,
  CardActions, Button, Chip
} from '@mui/material';
import axios from '../api/axios';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get('/spaces');
        setSpaces(Array.isArray(res.data) ? res.data : res.data.spaces || []);
      } catch (err) {
        console.error('Error al obtener espacios:', err);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
        Espacios Disponibles
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3
        }}
      >
        {spaces.map((space) => (
          <Card
            key={space._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 300
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>{space.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {space.description || 'Sin descripción'}
              </Typography>
              <Typography variant="body2">📍 Ubicación: {space.location}</Typography>
              <Typography variant="body2">👥 Capacidad: {space.capacity}</Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Chip
                label={space.available ? 'Disponible' : 'No disponible'}
                color={space.available ? 'success' : 'default'}
                size="small"
              />
              {space.available && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/reservations/new/${space._id}`)}
                >
                  Reservar
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Spaces;