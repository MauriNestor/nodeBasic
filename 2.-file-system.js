// const fs = require('fs');

// fs.readFile('archivo.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

const fs = require('fs');

fs.rename('archivo.txt', 'nuevoArchivo.txt', (err) => {
    if (err) throw err;
    console.log('Archivo renombrado.');
});
