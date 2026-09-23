import { SchemaType } from '@google/generative-ai';

export const recetaResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    fechaEmision: {
      type: SchemaType.STRING,
      description: 'Fecha de emision de la receta en formato YYYY-MM-DD.'
    },
    codigoBarra: {
      type: SchemaType.STRING,
      description: 'Numero o identificador del codigo de barras, o null si no existe.'
    },
    medicoNombre: {
      type: SchemaType.STRING,
      description: 'Nombre del medico prescriptor o null si no es legible.'
    },
    medicoMatricula: {
      type: SchemaType.STRING,
      description: 'Numero de matricula medica o null si no es visible.'
    },
    principioActivo: {
      type: SchemaType.STRING,
      description: 'Nombre del principio activo o droga principal solicitada.'
    },
    dosis: {
      type: SchemaType.STRING,
      description: 'Dosis o concentracion indicada (ej: 500mg, 5%, 10ml).'
    },
    csp: {
      type: SchemaType.STRING,
      description: 'Cantidad suficiente para o volumen final indicado (ej: 100ml, 30 capsulas).'
    },
    esLegible: {
      type: SchemaType.BOOLEAN,
      description: 'Indica si la imagen posee calidad y nitidez minima suficiente para su lectura.'
    },
    observaciones: {
      type: SchemaType.STRING,
      description: 'Observaciones clinicas o notas adicionales encontradas en la receta.'
    }
  },
  required: ['fechaEmision', 'principioActivo', 'dosis', 'csp', 'esLegible']
};

export default recetaResponseSchema;
