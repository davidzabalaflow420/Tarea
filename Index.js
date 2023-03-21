//Muestra una interfaz de usuario//

import React, { useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/appointments', {
        name,
        email,
        date,
        time,
      });
      setMessage(`Cita confirmada para el ${res.data.date} a las ${res.data.time}.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Agendar cita</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre completo:</label>
          <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input type="date" id="date" required value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="time">Hora:</label>
          <input type="time" id="time" required value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button type="submit">Agendar cita</button>
      </form>
    </div>
  );
};

export default Index;
