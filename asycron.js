const fs = require('fs');

// Leer un archivo de manera asíncrona
fs.readFile('nuevoArchivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Este código se ejecuta inmediatamente, sin esperar a que se lea el archivo
console.log('Después de iniciar la lectura del archivo.');
