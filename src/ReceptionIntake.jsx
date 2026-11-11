import React, { useState } from 'react';
import { Search, UserPlus, CreditCard } from 'lucide-react';
import { checkIn, priorities, specialties, today } from './queue';

export default function ReceptionIntake({ patients, setPatients, add }) {
  const [mode, setMode] = useState('checkin');
  const [code, setCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({ name: '', document: '', eps: '', specialty: specialties[0], priority: 'Sin prioridad', procedure: 'Consulta médica' });
  const patient = searched ? patients.find(item => item.ticket.toLowerCase() === code.trim().toLowerCase()) : null;
  const update = event => setForm({ ...form, [event.target.name]: event.target.value });

  function confirmArrival() {
    if (!patient || patient.status !== 'agendado') return;
    const updated = checkIn(patients, patient.id, Date.now());
    setPatients(updated);
    setResult(updated.find(item => item.id === patient.id));
    setSearched(false);
    setCode('');
  }

  function register(event) {
    event.preventDefault();
    const created = add({ ...form, walkIn: true, date: today(), time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }) });
    setCode(created.ticket);
    setResult(null);
    setSearched(true);
    setMode('checkin');
    setForm({ name: '', document: '', eps: '', specialty: specialties[0], priority: 'Sin prioridad', procedure: 'Consulta médica' });
  }

  return <section className="intake panel" aria-labelledby="intake-title">
    <div className="intake-heading"><div><span className="intake-kicker">Llegada y entrega de tarjeta</span><h2 id="intake-title">Recibir a un paciente</h2><p>Busca su código o registra sus datos si no tiene cita.</p></div><CreditCard size={28} aria-hidden="true"/></div>
    <div className="intake-tabs"><button className={mode === 'checkin' ? 'selected' : ''} onClick={() => { setMode('checkin'); setResult(null); }}><Search size={17}/> Verificar código</button><button className={mode === 'register' ? 'selected' : ''} onClick={() => { setMode('register'); setResult(null); }}><UserPlus size={17}/> Registrar paciente</button></div>
    {mode === 'checkin' ? <>
      <form className="intake-search" onSubmit={event => { event.preventDefault(); setSearched(true); setResult(null); }}><label className="field"><span>Código de cita o turno</span><input value={code} onChange={event => { setCode(event.target.value); setSearched(false); }} placeholder="Ej. P-106" required /></label><button className="button">Buscar paciente</button></form>
      {searched && !patient && <p className="intake-message" role="status">No encontramos ese código. Verifícalo o registra al paciente.</p>}
      {patient && <div className="intake-match"><div><small>{patient.ticket} · {patient.specialty}</small><strong>{patient.name}</strong><span>Documento: {patient.document} · {patient.priority}</span><span>Estado: {patient.status === 'agendado' ? 'Pendiente de llegada' : patient.status}</span></div>{patient.status === 'agendado' ? <button className="button" onClick={confirmArrival}>Confirmar llegada y asignar tarjeta</button> : <p>Este turno no está pendiente de llegada.</p>}</div>}
      {result && <div className="intake-success" role="status"><CreditCard size={24}/><div><strong>Llegada confirmada · {result.ticket}</strong><p>Entrega la tarjeta BeeBeat <b>{result.card}</b> a {result.name}. La asignación es simulada.</p></div></div>}
    </> : <form className="form-grid intake-form" onSubmit={register}>
      <label className="field"><span>Nombre completo</span><input name="name" value={form.name} onChange={update} required /></label>
      <label className="field"><span>Documento</span><input name="document" value={form.document} onChange={update} required /></label>
      <label className="field"><span>EPS</span><input name="eps" value={form.eps} onChange={update} required /></label>
      <label className="field"><span>Trámite</span><select name="procedure" value={form.procedure} onChange={update}><option>Consulta médica</option><option>Control</option><option>Autorización</option></select></label>
      <label className="field"><span>Especialidad</span><select name="specialty" value={form.specialty} onChange={update}>{specialties.map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="field"><span>Prioridad</span><select name="priority" value={form.priority} onChange={update}>{priorities.filter(item => item !== 'Urgencia vital').map(item => <option key={item}>{item}</option>)}</select></label>
      <div className="form-wide"><p className="hint">Usa solo datos ficticios. Ante una urgencia real, busca atención clínica inmediata.</p><button className="button">Registrar y verificar llegada</button></div>
    </form>}
  </section>;
}
