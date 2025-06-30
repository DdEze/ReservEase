import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Paper
} from '@mui/material';

const SpaceForm = ({ initialData = {}, onSubmit, submitText = "Guardar" }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
      }}
    >
      <Paper
              elevation={3}
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 3,
                bgcolor: 'white'
              }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          margin= "normal"
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Ubicación"
          name="location"
          margin= "normal"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Capacidad"
          name="capacity"
          margin= "normal"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Descripción"
          name="description"
          margin= "normal"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
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
      </Paper>
    </Box>
  );
};

export default SpaceForm;