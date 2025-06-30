import React from 'react';
import axios from '../../api/axios';
import SpaceForm from '../../components/SpaceForm';
import { useSnackbar } from '../../context/SnackbarContext';
import { Container, Typography, Box } from '@mui/material';

const CreateSpace = () => {
  const { showSnackbar } = useSnackbar();

  const handleCreate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/spaces', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar('Espacio creado correctamente', 'success');
    } catch (error) {
      console.error('Error al crear espacio:', error.response?.data || error);
      showSnackbar('Error al crear espacio', 'error');
    }
  };

  return (
    <Container sx={{ mt: 2, mb: 6 }}>
       <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth={600}>
           <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }} textAlign="center">
            Crear nuevo espacio
          </Typography>
          <SpaceForm onSubmit={handleCreate} submitText="Crear" />
        </Box>
      </Box>
    </Container>
  );
};

export default CreateSpace;