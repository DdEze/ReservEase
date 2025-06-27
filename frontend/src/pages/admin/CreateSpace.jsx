import React from 'react';
import axios from '../../api/axios'
import SpaceForm from '../../components/SpaceForm';
import { useSnackbar } from '../../context/SnackbarContext';

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
    <div>
      <h2>Crear nuevo espacio</h2>
      <SpaceForm onSubmit={handleCreate} submitText="Crear" />
    </div>
  );
};

export default CreateSpace;