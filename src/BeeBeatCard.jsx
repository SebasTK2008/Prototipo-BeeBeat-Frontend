import React from 'react';
import { Activity, BellRing, Radio } from 'lucide-react';
import { queueInfo } from './queue';

export function BeeBeatCard({ patients, patient, compact = false }) {
  const info = patient && queueInfo(patients, patient);
  const alerted = info?.alerted || info?.turnAlert;
  const hasCard = Boolean(patient?.card);
  const status = info?.turnAlert ? 'Es tu turno' : info?.alerted ? 'Acércate' : !hasCard ? 'Pendiente de entrega' : patient.status === 'esperando' ? 'En espera' : 'Atención finalizada';

  return <section className={`device-section ${compact ? 'device-section--compact' : ''}`} aria-label="Estado de la tarjeta BeeBeat">
    <div className="device-copy">
      <span className="device-kicker"><Radio size={15}/> La tarjeta del paciente</span>
      <h2>BeeBeat <span>te avisa.</span></h2>
      <p>{info?.turnAlert ? `La tarjeta de ${patient.name} simula el aviso: ya es su turno de atención.` : info?.alerted ? `La tarjeta de ${patient.name} simula el aviso para acercarse: faltan dos personas antes de su turno.` : hasCard && patient.status === 'esperando' ? `La tarjeta ${patient.card} está asignada a ${patient.name}. Avisará cuando falten dos personas y cuando sea su turno.` : hasCard ? `La tarjeta ${patient.card} está asignada a ${patient.name}.` : 'Al registrar la llegada se asigna una tarjeta para acompañar la espera.'}</p>
      <div className={`device-status ${alerted ? 'device-status--alert' : ''}`} role="status"><span/> {status} <small>· Simulación</small></div>
    </div>
    <div className={`device-art ${alerted ? 'device-art--alert' : ''}`} aria-hidden="true">
      <div className="device-wave wave-one"/><div className="device-wave wave-two"/>
      <div className="device-body"><div className="device-top"><Activity size={22}/><span>Bee<strong>Beat</strong></span></div><div className="device-center"><BellRing size={31}/></div><div className="device-bottom"><span>{info?.turnAlert ? 'ya es tu turno' : 'tu turno se acerca'}</span><i/></div></div>
    </div>
  </section>;
}

export function BeeBeatOverview({ patients }) {
  const alerted = patients.filter(patient => { const info = queueInfo(patients, patient); return info.alerted || info.turnAlert; });
  const waiting = patients.filter(patient => patient.card && patient.status === 'esperando');
  const highlighted = alerted[0] || waiting[0];
  return <div className="device-overview">
    <BeeBeatCard patients={patients} patient={highlighted}/>
    <div className="device-summary"><div><strong>{waiting.length}</strong><span>tarjetas en espera</span></div><div><strong>{alerted.length}</strong><span>avisos simulados activos</span></div><p>El aviso se recalcula con la fila de cada especialidad. No hay conexión con tarjetas físicas.</p></div>
    {alerted.length > 1 && <p className="device-extra">Otros avisos simulados: {alerted.slice(1).map(patient => `${patient.name} (${patient.card}: ${queueInfo(patients, patient).turnAlert ? 'es su turno' : 'debe acercarse'})`).join(', ')}.</p>}
  </div>;
}
