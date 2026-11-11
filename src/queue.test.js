import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialData, waitingQueue, advance, queueInfo, checkIn, addDemoPatients } from './queue.js';

test('prioriza vulnerabilidad y calcula alerta con dos personas delante', () => {
  const patients = initialData();
  const queue = waitingQueue(patients, 'Medicina general');
  assert.equal(queue[0].priority, 'Adulto mayor');
  assert.equal(queueInfo(patients, queue[2]).alerted, true);
  assert.equal(queueInfo(patients, queue[1]).alerted, false);
});
test('finalizar atención avanza solo la especialidad elegida', () => {
  const patients = advance(initialData(), 'Medicina general');
  assert.equal(patients.find(p => p.id === 'demo-1').status, 'atendido');
  assert.equal(patients.find(p => p.id === 'demo-2').status, 'atendiendo');
  assert.equal(patients.find(p => p.id === 'demo-5').status, 'esperando');
});

test('la tarjeta muestra dos avisos distintos durante el avance del turno', () => {
  let patients = initialData();
  const id = 'demo-4';
  const info = () => queueInfo(patients, patients.find(patient => patient.id === id));
  assert.equal(info().alerted, true);
  assert.equal(info().turnAlert, false);
  patients = advance(patients, 'Medicina general');
  assert.equal(info().alerted, false);
  assert.equal(info().turnAlert, false);
  patients = advance(patients, 'Medicina general');
  patients = advance(patients, 'Medicina general');
  assert.equal(info().turnAlert, true);
  patients = advance(patients, 'Medicina general');
  assert.equal(info().turnAlert, false);
});

test('un paciente sin tarjeta no muestra aviso de tarjeta', () => {
  const patients = initialData();
  const patient = { ...patients[3], card: undefined };
  assert.equal(queueInfo(patients, patient).alerted, false);
  assert.equal(queueInfo(patients, { ...patient, status: 'atendiendo' }).turnAlert, false);
});

test('recepción confirma una llegada y asigna una tarjeta una sola vez', () => {
  const patients = initialData();
  const checkedIn = checkIn(patients, 'demo-6', 20);
  const patient = checkedIn.find(item => item.id === 'demo-6');
  assert.equal(patient.status, 'esperando');
  assert.equal(patient.card, 'BB-06');
  assert.equal(patient.order, 20);
  assert.equal(checkIn(checkedIn, 'demo-6', 21), checkedIn);
  assert.equal(checkIn(checkedIn, 'missing', 21), checkedIn);
});

test('agrega pacientes de prueba sin reemplazar datos y permite iniciar la atención', () => {
  const existing = initialData();
  const patients = addDemoPatients(existing, 'Psicología', '2026-01-01');
  assert.equal(patients.length, existing.length + 4);
  assert.equal(patients[0], existing[0]);
  assert.equal(waitingQueue(patients, 'Psicología').length, 4);
  assert.equal(advance(patients, 'Psicología').find(patient => patient.specialty === 'Psicología' && patient.status === 'atendiendo').name, 'Paciente de prueba 1');
  assert.equal(new Set(patients.map(patient => patient.ticket)).size, patients.length);
});
