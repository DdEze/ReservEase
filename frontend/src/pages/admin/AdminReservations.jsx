import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from '../../api/axios';
import { useSnackbar } from '../../context/SnackbarContext';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { showSnackbar } = useSnackbar();

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/reservation/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(res.data);
    } catch (error) {
      console.error('Error al obtener reservas admin:', error);
      showSnackbar('Error al cargar reservas', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta reserva?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/reservation/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar('Reserva eliminada correctamente', 'success');
      fetchReservations();
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
      showSnackbar('Error al eliminar reserva', 'error');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
        Reservas de Todos los Usuarios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Espacio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Horario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation._id}>
              <TableCell>{reservation.user?.name} {reservation.user?.surname}</TableCell>
              <TableCell>{reservation.space?.name}</TableCell>
              <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {reservation.timeStart && reservation.timeEnd
                  ? `${reservation.timeStart} - ${reservation.timeEnd}`
                  : 'Horario no definido'}
              </TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(reservation._id)}
                >
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

export default AdminReservations;