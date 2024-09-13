# node JS desde 0

- 2 tipos de estandares para exportar modulos en Js
```
// Definición de un módulo en CommonJS
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};

// Importando un módulo en CommonJS
const math = require('./math');

console.log(math.add(2, 3)); // 5
console.log(math.subtract(5, 2)); // 3
```
y el otro, que es mas moderno y mas usado: `ES6 (ESM)`
```
// Definición de un módulo en ES6 (ESM)
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Importando un módulo en ES6 (ESM)
import { add, subtract } from './math.js';

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
```

- `natives modules` :  son aquellos que vienen incluidos con la instalación de Node.js
```
const os = require('os');

// Información sobre la CPU
console.log(os.cpus());

// Memoria libre del sistema
console.log(`Memoria libre: ${os.freemem()} bytes`);

// Directorio home del usuario
console.log(`Directorio home: ${os.homedir()}`);

```
- `file system`: existen 2 tipos, sicrono y asycrono:

`ejemplo sincrono`
```
const fs = require('fs');

// Leer un archivo de manera síncrona
const data = fs.readFileSync('archivo.txt', 'utf8');
console.log(data);

// Este código no se ejecuta hasta que el archivo haya sido leído completamente
console.log('Después de leer el archivo.');
```
`asincrono`: En la programación asíncrona, las operaciones se inician pero no bloquean la ejecución del programa. En lugar de esperar a que se complete la operación, el programa continúa ejecutándose, y una vez que la operación asíncrona se completa, se llama a un callback, se resuelve una promesa, o se utiliza async/await para manejar el resultado.
```
const fs = require('fs');

// Leer un archivo de manera asíncrona
fs.readFile('archivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Este código se ejecuta inmediatamente, sin esperar a que se lea el archivo
console.log('Después de iniciar la lectura del archivo.');

```
- `callback`: se ejecuta al terminar una funcion, lo q esta dentro del callback estara esperando, de mientras se seguira ejecutnado lo q esta afuera
```
const fs = require('fs');

// Leer un archivo de manera asíncrona
fs.readFile('nuevoArchivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Este código se ejecuta inmediatamente, sin esperar a que se lea el archivo
console.log('Después de iniciar la lectura del archivo.');
```
- `promises` remplaza los callbacks
```
const fs = require('fs/promises');

console.log('Leyendo el primer archivo...');

fs.readFile('./archivo1.txt', 'utf-8')
    .then(text => {
        console.log('primer texto:', text);
    });

console.log('→ Hacer cosas mientras lee el archivo...');
console.log('Leyendo el segundo archivo...');

fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log('segundo texto:', text);
    });

```
- `promisifile` para convertir a promesa si no diera en un modulo nativo, no es recomendable

- `async -await` hay 2 tipos : asincrono secuencial, asincrono en paraleo

1. secuencial.- Las tareas se ejecutan de manera asíncrona, pero el código espera que cada una termine antes de comenzar la siguiente. Ejemplo con `async/await`:

```
    async function secuencial() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Primero");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Segundo");
    }
    secuencial();
    // Output después de 2 segundos: Primero, Segundo

```

2. paralelo:  Las tareas se ejecutan simultáneamente sin bloquearse unas a otras. Ejemplo con `Promise.all`:

```
async function paralelo() {
  await Promise.all([
    new Promise((resolve) => setTimeout(() => { console.log("Primero"); resolve(); }, 1000)),
    new Promise((resolve) => setTimeout(() => { console.log("Segundo"); resolve(); }, 1000)),
  ]);
}
paralelo();
// Output después de 1 segundo: Primero, Segundo (simultáneos)

```
3. bonus: concurrente es como el ejemplo 4, el orden de los resultados no esta garantizado.
- // IIFE - Inmediatly Invoked Function Expression (funcion anonima llamada al instante)
 

 - se usa el modulo de `path`, para saber extensiones, archivos, rutas etc
- `path`: Se usa en rutas o comandos para trabajar en diferentes directorios.
- objeto global `process`: 
```
process.cwd(): muestra el directorio de trabajo actual.
process.env.PEPITO: accede a una variable de entorno llamada PEPITO.
```
- module `http`: 
- module `net` para 

## Clase 2
- types of status code
- watch(experimental) o usar Nodemon aunq es mas lento
- `headers`:  ejemplos de distintos tipos de rutas
- `buffer`: clase global para trabjar datos binarios, util para lo q sea q no sea numero, cadenas de texto o json

### servidor
- `get`con node puro:
```
const http = require('http');

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Configurar la cabecera de la respuesta
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Enviar la respuesta
    res.end('Hello, World!\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

```
- `POST` node puro:
```
const http = require('http');

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    // Recibir los datos en partes
    req.on('data', chunk => {
      body += chunk.toString(); // Convertir el buffer a string
    });

    // Cuando todos los datos han sido recibidos
    req.on('end', () => {
      // Responder con los datos recibidos
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(`{"received": ${body}}`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

```
## Express
1. middlewares: previo a tratar la request, algo en medio de la request y la respuesta, something like a proxy
2. Los middlewares son funciones en Node.js que se ejecutan durante el ciclo de vida de una solicitud HTTP, antes de que llegue al controlador de ruta o después de que se haya procesado la respuesta. Los middlewares pueden realizar diversas tareas como autenticación, manejo de errores, registro de solicitudes, entre otras.
3. ya viene echo el middlewares
```
const express = require('express');
const app = express();

// Middleware global para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pasa al siguiente middleware o ruta
});

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta GET
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Ruta POST
app.post('/submit', (req, res) => {
  const receivedData = req.body;
  res.json({ received: receivedData });
});

// Middleware para manejar errores (debe ir al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

```
### API REST (video 3)
- `path to regexp`: permite que las rutas en tu aplicación puedan tener partes variables (como IDs, nombres, etc.) y que esas partes dinámicas sean capturadas fácilmente.
1. ruta con parametro dinamico
```
const express = require('express');
const app = express();

// Ruta con un parámetro dinámico :id
app.get('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id; // Captura el valor del parámetro dinámico
  res.send(`Usuario con ID: ${idUsuario}`);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});

```

- diferencias entre POST, PUT PATCH
`idempotencia`: propiedad de realizar una accion determinada varias veces y aun asi conseguir siempre el mismo resultado q se obtendria al hacerlo una vez
1. POST: crear un nuevo elemento/recurso en el servidor. `no es idepotente`
2. actualizar totalmente un elemento ya existente o crearlo si no existe `si es idempotente`
3. actualizar parcialmente un elemento/recurso `si y no`
