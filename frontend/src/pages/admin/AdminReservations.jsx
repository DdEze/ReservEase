import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody
} from '@mui/material';
import axios from '../../api/axios'

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/reservation/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(res.data);
    } catch (error) {
      console.error('Error al obtener reservas admin:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reservas de Todos los Usuarios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Espacio</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation._id}>
                <TableCell>{reservation.user?.name} {reservation.user?.surname}</TableCell>
                <TableCell>{reservation.space?.name}</TableCell>
                <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
                <TableCell>
                    {reservation.startTime && reservation.endTime
                    ? `${reservation.startTime} - ${reservation.endTime}`
                    : 'Horario no definido'}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminReservations;