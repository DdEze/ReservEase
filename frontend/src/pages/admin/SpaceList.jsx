import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Box, Paper, TableContainer
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const fetchSpaces = async () => {
    try {
      const response = await axios.get('/spaces');
      setSpaces(response.data);
    } catch (error) {
      console.error('Error al cargar espacios:', error);
      showSnackbar('Error al cargar espacios', 'error');
    }
  };

  const eliminarEspacio = async (id) => {
    if (window.confirm('¿Estás seguro que querés eliminar este espacio?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/spaces/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSpaces();
        showSnackbar('Espacio eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar espacio:', error);
        showSnackbar('Error al eliminar espacio', 'error');
      }
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>Gestión de Espacios</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/admin/spaces/new')}
        >
          Crear nuevo espacio
        </Button>
      </Box>

      {spaces.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hay espacios registrados.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Ubicación</strong></TableCell>
                <TableCell><strong>Capacidad</strong></TableCell>
                <TableCell><strong>Disponible</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spaces.map((space) => (
                <TableRow
                  key={space._id}
                  hover
                  sx={{ transition: 'background-color 0.2s' }}
                >
                  <TableCell>{space.name}</TableCell>
                  <TableCell>{space.location}</TableCell>
                  <TableCell>{space.capacity}</TableCell>
                  <TableCell>{space.available ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/admin/spaces/edit/${space._id}`)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => eliminarEspacio(space._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SpaceList;