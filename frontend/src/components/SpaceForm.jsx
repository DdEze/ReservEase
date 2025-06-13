import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const SpaceForm = ({ initialData = {}, onSubmit, submitText = "Guardar" }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location: initialData.location || '',
        capacity: initialData.capacity || '',
        description: initialData.description || '',
        available: initialData.available ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Ubicación"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Capacidad"
        name="capacity"
        type="number"
        value={formData.capacity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.available}
            onChange={handleChange}
            name="available"
          />
        }
        label="Disponible"
      />
      <Button type="submit" variant="contained" color="primary">
        {submitText}
      </Button>
    </form>
  );
};

export default SpaceForm;