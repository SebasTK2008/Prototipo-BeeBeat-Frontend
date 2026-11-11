import React, { useState } from 'react';
import { LockKeyhole, ArrowRight } from 'lucide-react';

const accounts = { reception: { user: 'recepcion', password: 'demo123', label: 'Recepción' }, doctor: { user: 'medico', password: 'demo123', label: 'Personal médico' } };

export function Login({ role, onLogin, onCancel }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const account = accounts[role];
  return <div className="access-wrap"><section className="panel access-panel"><LockKeyhole size={28}/><p className="intake-kicker">Acceso de demostración</p><h1>Ingresar a {account.label.toLowerCase()}</h1><p>Usa la cuenta de ejemplo para explorar esta vista.</p><form onSubmit={event => { event.preventDefault(); if (user.trim().toLowerCase() === account.user && password === account.password) onLogin(role); else setError(true); }}><label className="field"><span>Usuario</span><input autoComplete="username" value={user} onChange={event => setUser(event.target.value)} required /></label><label className="field"><span>Contraseña</span><input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label>{error && <p className="error" role="alert">Usuario o contraseña incorrectos. Revisa los datos de demostración.</p>}<button className="button full">Ingresar <ArrowRight size={17}/></button></form><div className="access-credentials"><strong>Cuenta de prueba</strong><p>Usuario: <b>{account.user}</b><br/>Contraseña: <b>{account.password}</b></p><small>Acceso simulado en este navegador. No protege información real.</small></div><button className="back" onClick={onCancel}>Volver a elegir perfil</button></section></div>;
}

export function ArrivalGuide({ go }) {
  return <div className="kiosk-wrap"><div className="kiosk-heading"><div className="greeting">Al llegar</div><h1>Te damos la bienvenida</h1><p>Recepción confirmará tu llegada y te entregará tu tarjeta BeeBeat.</p></div><section className="panel kiosk-panel"><h2>¿Ya tienes un código?</h2><p>Muéstralo en recepción. Allí verificarán tus datos y te entregarán la tarjeta para esperar.</p><div className="arrival-steps"><div><span>1</span><p><strong>Presenta tu código</strong><br/>Lo encuentras en la confirmación de tu cita.</p></div><div><span>2</span><p><strong>Recibe tu tarjeta BeeBeat</strong><br/>La recepcionista la asigna a tu turno.</p></div><div><span>3</span><p><strong>Espera cerca</strong><br/>BeeBeat te avisará cuando tu turno se acerque.</p></div></div><p>Si no tienes cita, solicita a recepción que te registre.</p><button className="button" onClick={() => go('patient')}>Consultar o agendar cita</button><p className="hint">Prototipo: la entrega y el aviso de la tarjeta son simulados.</p></section></div>;
}
