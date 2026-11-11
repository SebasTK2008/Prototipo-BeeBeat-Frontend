import React from 'react';
import { Activity, CalendarDays, ClipboardList, Stethoscope } from 'lucide-react';
import './gateway.css';

const options = [
  { role: 'patient', icon: CalendarDays, title: 'Soy paciente', description: 'Agenda una cita o consulta tu turno.', action: 'Ir al portal del paciente' },
  { role: 'reception', icon: ClipboardList, title: 'Soy recepcionista', description: 'Registra llegadas y supervisa la espera.', action: 'Ingresar a recepción' },
  { role: 'doctor', icon: Stethoscope, title: 'Soy médico', description: 'Consulta y finaliza las atenciones.', action: 'Ingresar como médico' },
];

export default function AccessGateway({ onSelect }) {
  return <main className="gateway">
    <header className="gateway-header"><div className="gateway-logo"><Activity size={25} aria-hidden="true"/><span>Bee<strong>Beat</strong></span></div><span>Prototipo de demostración</span></header>
    <div className="gateway-layout"><section className="gateway-intro"><span className="gateway-line"/><p className="gateway-label">Una espera más tranquila</p><h1>Bienvenido a BeeBeat</h1><p>Un espacio para cuidar el tiempo de quienes atienden y de quienes esperan.</p><div className="gateway-note"><strong>Una tarjeta, dos avisos.</strong><p>BeeBeat acompaña al paciente y le avisa cuando su atención se acerca y cuando es su turno.</p></div></section>
      <section className="gateway-choices" aria-labelledby="gateway-title"><h2 id="gateway-title">¿Cómo quieres ingresar?</h2><p>Selecciona la opción que corresponda.</p><div className="gateway-options">{options.map(({ role, icon: Icon, title, description, action }) => <button key={role} className="gateway-option" onClick={() => onSelect(role)}><Icon size={23} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small><b>{action}</b></span></button>)}</div><p className="gateway-disclaimer">Accesos simulados. No ingreses datos personales reales.</p></section></div>
    <footer className="gateway-footer">BeeBeat · Prototipo frontend</footer>
  </main>;
}
