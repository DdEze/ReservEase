import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
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
      <Typography variant="h4" gutterBottom>
        Espacios Disponibles
      </Typography>
      <Grid container spacing={3}>
        {spaces.map((space) => (
          <Grid item xs={12} sm={6} md={4} key={space._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{space.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {space.description}
                </Typography>
                <Typography variant="body2">Ubicación: {space.location}</Typography>
                <Typography variant="body2">Capacidad: {space.capacity}</Typography>
              </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Chip
                        label={space.available ? 'Disponible' : 'No disponible'}
                        color={space.available ? 'success' : 'default'}
                    />
                    {space.available && (
                        <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/reservations/new/${space._id}`)}
                        >
                        Reservar
                        </Button>
                    )}
                </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Spaces;