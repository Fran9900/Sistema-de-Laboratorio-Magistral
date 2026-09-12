import crypto from 'crypto';

export function generarPin() {
  const numero = crypto.randomInt(0, 10000);
  return numero.toString().padStart(4, '0');
}

export function validarFormatoPin(pin) {
  if (typeof pin !== 'string') {
    return false;
  }
  return /^\d{4}$/.test(pin);
}

export async function generarPinUnico(existePinFn, maxIntentos = 10) {
  if (typeof existePinFn !== 'function') {
    throw new Error('Se requiere una funcion verificadora para garantizar la unicidad del PIN.');
  }

  let intentos = 0;

  while (intentos < maxIntentos) {
    const pinCandidato = generarPin();
    const yaExiste = await existePinFn(pinCandidato);

    if (!yaExiste) {
      return pinCandidato;
    }

    intentos++;
  }

  throw new Error(`No fue posible generar un PIN unico tras ${maxIntentos} intentos consecutivos.`);
}

export default {
  generarPin,
  validarFormatoPin,
  generarPinUnico
};
