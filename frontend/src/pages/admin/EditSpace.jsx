import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SpaceForm from '../../components/SpaceForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
import { Container, Typography, Box } from '@mui/material';

const EditSpace = () => {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get(`/spaces/${id}`);
        setSpaceData(response.data);
      } catch (error) {
        console.error('Error al cargar espacio:', error.response?.data || error);
        showSnackbar('No se pudo cargar el espacio', 'error');
      }
    };

    fetchSpace();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/spaces/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/spaces');
      showSnackbar('Espacio actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar espacio:', error.response?.data || error);
      showSnackbar('Error al actualizar espacio', 'error');
    }
  };

  if (!spaceData) return <Typography sx={{ mt: 4 }}>Cargando datos...</Typography>;

  return (
    <Container sx={{  mt: 2, mb: 6 }}>
      <Box display="flex" justifyContent="center">
          <Box width="100%" maxWidth={600}>
            <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }} textAlign="center">
              Editar espacio
            </Typography>
            <SpaceForm
              initialData={spaceData}
              onSubmit={handleUpdate}
              submitText="Actualizar"
            />
          </Box>
      </Box>
    </Container>
  );
};

export default EditSpace;