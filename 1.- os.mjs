import os  from 'node:os'

// Obtener el tiempo de actividad en segundos
const uptimeInSeconds = os.uptime();

// Convertir el tiempo de actividad a horas, minutos y segundos
const uptimeInHours = Math.floor(uptimeInSeconds / 3600);
const uptimeInMinutes = Math.floor((uptimeInSeconds % 3600) / 60);
const uptimeInSecondsRemaining = uptimeInSeconds % 60;

console.log(`Tiempo de actividad: ${uptimeInHours} horas, ${uptimeInMinutes} minutos, y ${uptimeInSecondsRemaining} segundos.`);
