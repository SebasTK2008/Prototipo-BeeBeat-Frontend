# Prototipo-BeeBeat-Frontend

Demostración frontend de BeeBeat: reserva de cita, registro en tótem y gestión de turnos en recepción. Usa únicamente datos en el navegador; no está conectada a servicios sanitarios ni a tarjetas físicas. No introduzcas datos reales.

## Desarrollo

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

`npm test` verifica las reglas de cola y `npm run build` genera el sitio estático en `dist/`. Para Vercel, usar el comando de compilación `npm run build` y el directorio de salida `dist`.

Consulta [el contexto y los límites](docs/contexto.md) y [la guía de interfaz y flujo](docs/diseno-y-flujo.md).
