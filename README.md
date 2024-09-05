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
- module `net` para tcp