// App.tsx
import React, { useState } from 'react';

const API_URL = 'https://682b46c6d29df7a95be2c92e.mockapi.io/Reporte';

const placeholders = {
  Nombres: 'Juan',
  Apellidos: 'Pérez',
  mes: 'Diciembre',
  grupo: '1',
  precursor: 'Sí',
  publicador: 'Sí',
  cantHoras: '0',
  cantEstudios: '0',
  predicaste: 'No',
  disteEstudios: 'No',
  observacion: 'Ninguna'
};

function App() {
  const [form, setForm] = useState({
    Nombres: '',
    Apellidos: '',
    mes: '',
    grupo: '',
    precursor: '',
    publicador: '',
    cantHoras: '',
    cantEstudios: '',
    predicaste: '',
    disteEstudios: '',
    observacion: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosLimpios = {
      ...form,
      cantHoras: Number(form.cantHoras) || 0,
      cantEstudios: Number(form.cantEstudios) || 0
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosLimpios)
    })
      .then(res => res.json())
      .then(() => {
        setForm({
          Nombres: '', Apellidos: '', mes: '', grupo: '', precursor: '',
          publicador: '', cantHoras: '', cantEstudios: '', predicaste: '',
          disteEstudios: '', observacion: ''
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        console.error(err);
        setError('Error al guardar: ' + err.message);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Informe de Predicación</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">¡Informe guardado correctamente!</p>}
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(form).map(key => (
          <div key={key} className="form-group">
            <label htmlFor={key} className="form-label">{key}</label>
            <input
              id={key}
              name={key}
              className="form-input"
              value={form[key]}
              onChange={handleChange}
              placeholder={placeholders[key] || ''}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Guardar</button>
      </form>
    </div>
  );
}

export default App;