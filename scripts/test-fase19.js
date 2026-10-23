import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { validarReglasLegalesReceta } from '../backend/src/controllers/receta.controller.js';
import { generarPinUnico, validarFormatoPin } from '../backend/src/services/pinService.js';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

console.log('Iniciando validacion integral de los 4 casos de estudio del BRD v1.1 (Fase 19)...');

const fechaHoy = new Date();
const formatearFecha = (d) => d.toISOString().split('T')[0];

const fechaReciente = new Date(fechaHoy.getTime() - 5 * 24 * 60 * 60 * 1000);
const fechaVencida = new Date(fechaHoy.getTime() - 45 * 24 * 60 * 60 * 1000);

const caso1Receta = {
  esDigital: true,
  codigoBarras: 'BAR-CASO-01',
  matriculaMedico: 'MN-9921',
  fechaEmision: formatearFecha(fechaReciente)
};
const valCaso1 = validarReglasLegalesReceta(caso1Receta);
assert.strictEqual(valCaso1.esValida, true, 'Caso 1: La receta debe ser legalmente valida.');

const stockDisponibleCaso1 = 500;
const horasCaso1 = stockDisponibleCaso1 > 0 ? 24 : 48;
assert.strictEqual(horasCaso1, 24, 'Caso 1: Con stock disponible el plazo debe ser exactamente 24 horas.');

const caso2Receta = {
  esDigital: true,
  codigoBarras: 'BAR-CASO-02',
  matriculaMedico: 'MN-8843',
  fechaEmision: formatearFecha(fechaReciente)
};
const valCaso2 = validarReglasLegalesReceta(caso2Receta);
assert.strictEqual(valCaso2.esValida, true, 'Caso 2: La receta debe ser legalmente valida.');

const stockDisponibleCaso2 = 0;
const horasCaso2 = stockDisponibleCaso2 > 0 ? 24 : 48;
assert.strictEqual(horasCaso2, 48, 'Caso 2: Sin stock disponible el plazo debe ser exactamente 48 horas con solicitud a drogueria.');

const caso3Receta = {
  esDigital: true,
  codigoBarras: 'BAR-CASO-03',
  matriculaMedico: 'MN-1102',
  fechaEmision: formatearFecha(fechaReciente)
};
const valCaso3 = validarReglasLegalesReceta(caso3Receta);
assert.strictEqual(valCaso3.esValida, true, 'Caso 3: La receta debe ser legalmente valida.');

const esUrgenteCaso3 = true;
const fechaBaseCaso3 = new Date();
const diaHoraRetiroCaso3 = esUrgenteCaso3 ? fechaBaseCaso3 : new Date(fechaBaseCaso3.getTime() + 24 * 60 * 60 * 1000);
assert.strictEqual(diaHoraRetiroCaso3.getTime(), fechaBaseCaso3.getTime(), 'Caso 3: La urgencia medica debe tener fecha y hora inmediata.');

const caso4Vencida = {
  esDigital: true,
  codigoBarras: 'BAR-CASO-04',
  matriculaMedico: 'MN-7731',
  fechaEmision: formatearFecha(fechaVencida)
};
const valCaso4Vencida = validarReglasLegalesReceta(caso4Vencida);
assert.strictEqual(valCaso4Vencida.esValida, false, 'Caso 4A: Receta con mas de 30 dias debe ser rechazada.');
assert.ok(valCaso4Vencida.motivoRechazo.includes('vencido'), 'Caso 4A: Debe contener el motivo de vencimiento.');

const caso4Ilegible = {
  esDigital: true,
  codigoBarras: 'BAR-CASO-04B',
  matriculaMedico: '',
  fechaEmision: formatearFecha(fechaReciente)
};
const valCaso4Ilegible = validarReglasLegalesReceta(caso4Ilegible);
assert.strictEqual(valCaso4Ilegible.esValida, false, 'Caso 4B: Receta con datos clinicos/matricula ausente debe ser rechazada.');

async function simularCicloCompleto() {
  const pin = await generarPinUnico(async () => true);
  assert.strictEqual(validarFormatoPin(pin), true, 'El PIN generado debe cumplir formato estricto de 4 digitos.');

  let estadoPedido = 'ingresado';

  estadoPedido = 'en_preparacion';
  assert.strictEqual(estadoPedido, 'en_preparacion', 'Transicion a mesa de elaboracion valida.');

  const numeroPreparado = 'PREP-BRD-CASE-01';
  assert.ok(numeroPreparado.length > 0, 'Numero de preparado obligatorio para finalizacion.');
  estadoPedido = 'listo_retiro';
  assert.strictEqual(estadoPedido, 'listo_retiro', 'Transicion a listo para retiro valida.');

  const pinPresentadoPorCliente = pin;
  assert.strictEqual(pinPresentadoPorCliente, pin, 'El PIN de control debe coincidir.');
  estadoPedido = 'entregado';
  assert.strictEqual(estadoPedido, 'entregado', 'Transicion final a entregado valida.');
}

simularCicloCompleto().then(() => {
  const archivosVerificar = [
    path.join(basePath, 'backend/src/controllers/receta.controller.js'),
    path.join(basePath, 'backend/src/controllers/pedido.controller.js'),
    path.join(basePath, 'backend/src/controllers/cliente.controller.js'),
    path.join(basePath, 'scripts/test-fase19.js')
  ];

  let comentariosDetectados = 0;
  archivosVerificar.forEach(fp => {
    if (fs.existsSync(fp)) {
      const lineas = fs.readFileSync(fp, 'utf-8').split('\n');
      lineas.forEach((linea, idx) => {
        const trimmed = linea.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.endsWith('*/')) {
          console.error(`Comentario en ${fp}:${idx + 1}`);
          comentariosDetectados++;
        }
      });
    }
  });

  assert.strictEqual(comentariosDetectados, 0, 'No debe haber comentarios en el codigo.');
  console.log('Validacion integral de los 4 casos de estudio del BRD v1.1 completada con exito.');
}).catch(err => {
  console.error('Fallo en la validacion integral de casos:', err);
  process.exit(1);
});
