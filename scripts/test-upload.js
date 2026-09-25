import assert from 'assert';
import fs from 'fs';
import {
  validarTipoMime,
  generarNombreArchivo,
  TIPOS_PERMITIDOS,
  uploadDirectorio,
  uploadReceta
} from '../backend/src/middlewares/upload.js';

const tiposValidos = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
tiposValidos.forEach((tipo) => {
  assert.strictEqual(validarTipoMime(tipo), true);
});

const tiposInvalidos = ['text/plain', 'application/x-msdownload', 'image/gif', 'video/mp4', '', null, undefined];
tiposInvalidos.forEach((tipo) => {
  assert.strictEqual(validarTipoMime(tipo), false);
});

const nombre1 = generarNombreArchivo('receta_medica.PNG');
assert.ok(nombre1.startsWith('receta-'));
assert.ok(nombre1.endsWith('.png'));

const nombre2 = generarNombreArchivo('orden_medica.pdf');
assert.ok(nombre2.startsWith('receta-'));
assert.ok(nombre2.endsWith('.pdf'));

assert.notStrictEqual(nombre1, nombre2);

const conjuntoNombres = new Set();
for (let i = 0; i < 500; i++) {
  const nombre = generarNombreArchivo('test.jpg');
  assert.strictEqual(conjuntoNombres.has(nombre), false);
  conjuntoNombres.add(nombre);
}

assert.strictEqual(fs.existsSync(uploadDirectorio), true);
assert.strictEqual(typeof uploadReceta.single, 'function');

console.log('OK: Pruebas unitarias del middleware de upload finalizadas exitosamente.');
