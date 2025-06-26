import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Box
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  const fetchSpaces = async () => {
    try {
      const response = await axios.get('/spaces');
      setSpaces(response.data);
    } catch (error) {
      console.error('Error al cargar espacios:', error);
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
      } catch (error) {
        console.error('Error al eliminar espacio:', error);
      }
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h4">Gestión de Espacios</Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/spaces/new')}
        >
            Crear nuevo espacio
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Disponible</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spaces.map((space) => (
            <TableRow key={space._id}>
              <TableCell>{space.name}</TableCell>
              <TableCell>{space.location}</TableCell>
              <TableCell>{space.capacity}</TableCell>
              <TableCell>{space.available ? 'Sí' : 'No'}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/admin/spaces/edit/${space._id}`)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => eliminarEspacio(space._id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default SpaceList;