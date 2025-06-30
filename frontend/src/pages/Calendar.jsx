import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from '../api/axios';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Button,
  TextField, Container, Typography, CircularProgress
} from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from '../context/SnackbarContext';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSpace('');
    setTimeStart('');
    setTimeEnd('');
    setNote('');
  };

  const handleReservation = async () => {
    if (!selectedSpace || !selectedDate || !timeStart || !timeEnd) {
      showSnackbar('Faltan campos requeridos', 'error');
      return;
    }

    const payload = {
      space: selectedSpace,
      date: selectedDate,
      timeStart,
      timeEnd,
      note: note || ''
    };

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/reservation', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      handleCloseModal();
      fetchEvents();
      showSnackbar('Reserva creada con éxito', 'success');
    } catch (error) {
      showSnackbar('No se pudo crear la reserva', 'error');
      console.error('Error al crear reserva', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/reservation/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const eventosFormateados = res.data.map(r => ({
        title: r.space.name,
        start: r.date,
        allDay: true
      }));
      setEvents(eventosFormateados);
    } catch (error) {
      showSnackbar('Error al cargar reservas', 'error');
      console.error('Error al cargar reservas', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = async (arg) => {
    const localDate = dayjs(arg.date).format('YYYY-MM-DD');
    setSelectedDate(localDate);
    setOpenModal(true);

    try {
      const res = await axios.get('/spaces/available');
      setSpaces(res.data);
    } catch (error) {
      showSnackbar('Error al cargar espacios', 'error');
      console.error('Error al cargar espacios', error);
    }
  };

  const isTimeValid = (time) =>
    time && ['00', '30'].includes(time.split(':')[1]);

  const isFormValid = selectedSpace && isTimeValid(timeStart) && isTimeValid(timeEnd) && timeEnd > timeStart;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>Calendario de Reservas</Typography>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={600}
        dateClick={handleDateClick}
      />

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Reservar para el {selectedDate || '...'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Espacio</InputLabel>
            <Select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
            >
              {spaces.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name} - {s.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Hora de inicio"
            type="time"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            inputProps={{ step: 1800, min: '08:00', max: '21:00' }}
            InputLabelProps={{ shrink: true }}
            error={timeStart && !isTimeValid(timeStart)}
            helperText={
              timeStart && !isTimeValid(timeStart)
                ? 'Minutos válidos: 00 o 30'
                : ''
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Hora de fin"
            type="time"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            inputProps={{ step: 1800, min: '09:00', max: '22:00' }}
            InputLabelProps={{ shrink: true }}
            error={
              (timeEnd && timeEnd <= timeStart) ||
              !isTimeValid(timeEnd)
            }
            helperText={
              timeEnd && timeEnd <= timeStart
                ? 'La hora de fin debe ser posterior'
                : !isTimeValid(timeEnd)
                ? 'Minutos válidos: 00 o 30'
                : ''
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Nota (opcional)"
            multiline
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={handleReservation}
            variant="contained"
            disabled={!isFormValid || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Calendar;