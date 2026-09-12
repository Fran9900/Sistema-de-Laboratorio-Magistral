import assert from 'assert';
import { generarPin, validarFormatoPin, generarPinUnico } from '../backend/src/services/pinService.js';

const casosValidos = ['0000', '0123', '9999', '4582', '0005'];
casosValidos.forEach((pin) => {
  assert.strictEqual(validarFormatoPin(pin), true);
});

const casosInvalidos = [
  '123',
  '12345',
  'abcd',
  '12a4',
  '',
  ' 1234 ',
  null,
  undefined,
  1234,
  '--12'
];

casosInvalidos.forEach((pin) => {
  assert.strictEqual(validarFormatoPin(pin), false);
});

const totalMuestras = 1000;
const pinesGenerados = new Set();

for (let i = 0; i < totalMuestras; i++) {
  const pin = generarPin();
  assert.strictEqual(typeof pin, 'string');
  assert.strictEqual(pin.length, 4);
  assert.strictEqual(validarFormatoPin(pin), true);
  pinesGenerados.add(pin);
}

assert.ok(pinesGenerados.size > totalMuestras * 0.8);

async function testUnicidadConColisiones() {
  const baseDePinesEnUso = new Set(['1111', '2222', '3333', '4444', '5555']);

  const mockExistePin = async (pin) => {
    return baseDePinesEnUso.has(pin);
  };

  const nuevoPin = await generarPinUnico(mockExistePin);
  assert.strictEqual(validarFormatoPin(nuevoPin), true);
  assert.strictEqual(baseDePinesEnUso.has(nuevoPin), false);

  let intentosRealizados = 0;
  const mockForzarColisionDosVeces = async (pin) => {
    intentosRealizados++;
    if (intentosRealizados <= 2) {
      return true;
    }
    return false;
  };

  const pinTrasReintentos = await generarPinUnico(mockForzarColisionDosVeces, 5);
  assert.strictEqual(validarFormatoPin(pinTrasReintentos), true);
  assert.strictEqual(intentosRealizados, 3);

  let lanzoErrorEsperado = false;
  try {
    const mockSiempreColisiona = async () => true;
    await generarPinUnico(mockSiempreColisiona, 3);
  } catch (error) {
    lanzoErrorEsperado = true;
    assert.ok(error.message.includes('No fue posible generar un PIN unico'));
  }
  assert.strictEqual(lanzoErrorEsperado, true);
}

await testUnicidadConColisiones();
console.log('OK: Pruebas unitarias de pinService finalizadas exitosamente.');
