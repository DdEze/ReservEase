import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Switch, CircularProgress, Box
} from '@mui/material';
import axios from '../../api/axios';
import { useSnackbar } from '../../context/SnackbarContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const { showSnackbar } = useSnackbar();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/auth', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      showSnackbar('Error al obtener usuarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    setUpdatingUserId(userId);
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      const token = localStorage.getItem('token');
      await axios.put(
        `/auth/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSnackbar(`Rol cambiado a ${newRole}`, 'success');
      await fetchUsers();
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      showSnackbar('Error al cambiar rol', 'error');
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Container>
        <Typography variant="h5" mt={4}>
          No se encontraron usuarios.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>Lista de Usuarios</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre y Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol (Administrador)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.name} {u.surname}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Switch
                  checked={u.role === 'admin'}
                  onChange={() => handleToggleRole(u._id, u.role)}
                  disabled={updatingUserId === u._id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserList;