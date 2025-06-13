import React from 'react';
import axios from 'axios';
import SpaceForm from '../../components/SpaceForm';
import { useNavigate } from 'react-router-dom';

const CreateSpace = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/spaces', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/spaces');
    } catch (error) {
      console.error('Error al crear espacio:', error.response?.data || error);
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