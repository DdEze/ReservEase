import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Switch
} from '@mui/material';
import axios from '../../api/axios'
import { useSnackbar } from '../../context/SnackbarContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { showSnackbar } = useSnackbar();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/auth', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      showSnackbar('Error al obtener usuarios', 'error');
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      const token = localStorage.getItem('token');
      await axios.put(
        `/auth/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      showSnackbar('Error al cambiar rol', 'success');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Lista de Usuarios</Typography>
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