export const specialties = ['Medicina general', 'Odontología', 'Psicología'];
export const priorities = ['Sin prioridad', 'Adulto mayor', 'Embarazo', 'Discapacidad', 'Urgencia vital'];
export const slots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
export const today = () => new Date().toLocaleDateString('en-CA');

export function initialData() {
  const date = today();
  return [
    { id: 'demo-1', ticket: 'A-101', name: 'María Fernanda López', document: '10000001', specialty: specialties[0], priority: 'Sin prioridad', time: '08:00', date, status: 'atendiendo', card: 'BB-01', order: 1 },
    { id: 'demo-2', ticket: 'A-102', name: 'Carlos Rodríguez', document: '10000002', specialty: specialties[0], priority: 'Adulto mayor', time: '08:30', date, status: 'esperando', card: 'BB-02', order: 2 },
    { id: 'demo-3', ticket: 'A-103', name: 'Ana María Torres', document: '10000003', specialty: specialties[0], priority: 'Sin prioridad', time: '09:00', date, status: 'esperando', card: 'BB-03', order: 3 },
    { id: 'demo-4', ticket: 'A-104', name: 'Jorge Martínez', document: '10000004', specialty: specialties[0], priority: 'Sin prioridad', time: '09:30', date, status: 'esperando', card: 'BB-04', order: 4 },
    { id: 'demo-5', ticket: 'O-105', name: 'Lucía Herrera', document: '10000005', specialty: specialties[1], priority: 'Embarazo', time: '10:00', date, status: 'esperando', card: 'BB-05', order: 5 },
    { id: 'demo-6', ticket: 'P-106', name: 'Andrés Castro', document: '10000006', specialty: specialties[2], priority: 'Sin prioridad', time: '10:30', date, status: 'agendado', order: 6 },
  ];
}

const rank = priority => priority === 'Urgencia vital' ? 0 : priority === 'Sin prioridad' ? 2 : 1;
export function waitingQueue(patients, specialty) {
  return patients.filter(p => p.status === 'esperando' && (!specialty || p.specialty === specialty)).sort((a, b) => rank(a.priority) - rank(b.priority) || a.order - b.order);
}
export function advance(patients, specialty) {
  const current = patients.find(p => p.specialty === specialty && p.status === 'atendiendo');
  const next = waitingQueue(patients, specialty)[0];
  return patients.map(p => p.id === current?.id ? { ...p, status: 'atendido' } : p.id === next?.id ? { ...p, status: 'atendiendo' } : p);
}
export function nextCard(patients) {
  const last = Math.max(0, ...patients.map(patient => Number(patient.card?.split('-')[1]) || 0));
  return `BB-${String(last + 1).padStart(2, '0')}`;
}

export function addDemoPatients(patients, specialty, date) {
  const ticketNumber = Math.max(100, ...patients.map(patient => Number(patient.ticket?.split('-')[1]) || 0));
  const order = Math.max(0, ...patients.map(patient => patient.order || 0));
  const cardNumber = Math.max(0, ...patients.map(patient => Number(patient.card?.split('-')[1]) || 0));
  const prefix = specialty === specialties[0] ? 'A' : specialty === specialties[1] ? 'O' : 'P';
  const names = ['Paciente de prueba 1', 'Paciente de prueba 2', 'Paciente de prueba 3', 'Paciente de prueba 4'];
  const examples = names.map((name, index) => ({
    id: `demo-extra-${ticketNumber + index + 1}`,
    ticket: `${prefix}-${ticketNumber + index + 1}`,
    name,
    document: `DEMO-${ticketNumber + index + 1}`,
    specialty,
    priority: 'Sin prioridad',
    date,
    time: '09:00',
    status: 'esperando',
    card: `BB-${String(cardNumber + index + 1).padStart(2, '0')}`,
    order: order + index + 1,
    walkIn: true,
  }));
  return [...patients, ...examples];
}

export function checkIn(patients, patientId, order) {
  const patient = patients.find(item => item.id === patientId);
  if (!patient || patient.status !== 'agendado') return patients;
  const card = nextCard(patients);
  return patients.map(item => item.id === patientId ? { ...item, status: 'esperando', card, order } : item);
}
export function queueInfo(patients, patient) {
  const queue = waitingQueue(patients, patient.specialty);
  const index = queue.findIndex(p => p.id === patient.id);
  // "Dos turnos antes" cuenta las personas en espera delante, no la atención en curso.
  return { ahead: index, minutes: index < 0 ? null : (index + 1) * 15, alerted: Boolean(patient.card && index === 2), turnAlert: Boolean(patient.card && patient.status === 'atendiendo') };
}
