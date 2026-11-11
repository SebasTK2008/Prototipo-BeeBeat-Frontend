import React, { useState } from 'react';
import { addDemoPatients, specialties, today } from './queue';

export default function DoctorDemo({ setPatients, setNotice }) {
  const [specialty, setSpecialty] = useState(specialties[0]);

  function loadExamples(event) {
    event.preventDefault();
    setPatients(current => addDemoPatients(current, specialty, today()));
    setNotice(`Se agregaron cuatro pacientes ficticios en espera para ${specialty}. Selecciona esa especialidad abajo e inicia la atención.`);
  }

  return <section className="panel doctor-demo" aria-labelledby="doctor-demo-title">
    <div><h2 id="doctor-demo-title">Probar el flujo médico</h2><p>Agrega cuatro pacientes ficticios en espera, sin borrar los datos que ya tienes. Después selecciona la misma especialidad abajo.</p></div>
    <form onSubmit={loadExamples}><label className="field"><span>Especialidad de los pacientes de prueba</span><select value={specialty} onChange={event => setSpecialty(event.target.value)}>{specialties.map(item => <option key={item}>{item}</option>)}</select></label><button className="button secondary">Agregar pacientes de prueba</button></form>
  </section>;
}
