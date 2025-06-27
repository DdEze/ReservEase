import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from '../api/axios';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Button,
  TextField, Container, Typography
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
  const { showSnackbar } = useSnackbar();


  const handleReservation = async () => {
    if (!selectedSpace || !selectedDate || !timeStart || !timeEnd) {
      console.error('Faltan campos requeridos');
      return;
    }

    const payload = {
      space: selectedSpace,
      date: selectedDate.slice(0, 10),
      timeStart,
      timeEnd,
      note: note || ''
    };

    console.log('Enviando reserva:', payload);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/reservation', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOpenModal(false);
      setSelectedSpace('');
      setTimeStart('');
      setTimeEnd('');
      setNote('');
      fetchEvents();
      showSnackbar('Reserva creada con éxito', 'success');
    } catch (error) {
      showSnackbar('No se pudo crear la reserva', 'error');
      console.error('Error al crear reserva', error.response?.data || error);
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
      console.error('Error al cargar reservas', error);
      showSnackbar('Error al cargar reservas', 'error');
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
      const res = await axios.get('/spaces');
      setSpaces(res.data);
    } catch (error) {
      console.error('Error al cargar espacios', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Calendario de Reservas</Typography>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={600}
        dateClick={handleDateClick}
      />
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          Reservar para el {selectedDate ? selectedDate : '...'}
        </DialogTitle>
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
            error={timeStart && !['00', '30'].includes(timeStart.split(':')[1])}
            helperText={
              timeStart && !['00', '30'].includes(timeStart.split(':')[1])
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
              !['00', '30'].includes(timeEnd.split(':')[1])
            }
            helperText={
              timeEnd && timeEnd <= timeStart
                ? 'La hora de fin debe ser posterior'
                : !['00', '30'].includes(timeEnd.split(':')[1])
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
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleReservation} variant="contained" disabled={!selectedSpace}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Calendar;