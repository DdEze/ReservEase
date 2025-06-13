import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpaceForm from '../../components/SpaceForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditSpace = () => {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get(`/api/spaces/${id}`);
        setSpaceData(response.data);
      } catch (error) {
        console.error('Error al cargar espacio:', error.response?.data || error);
      }
    };

    fetchSpace();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/spaces/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/spaces');
    } catch (error) {
      console.error('Error al actualizar espacio:', error.response?.data || error);
    }
  };

  if (!spaceData) return <p>Cargando datos...</p>;

  return (
    <div>
      <h2>Editar espacio</h2>
      <SpaceForm
        initialData={spaceData}
        onSubmit={handleUpdate}
        submitText="Actualizar"
      />
    </div>
  );
};

export default EditSpace;