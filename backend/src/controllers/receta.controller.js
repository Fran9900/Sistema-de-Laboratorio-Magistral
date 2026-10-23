import { Model } from 'sequelize';
import db from '../config/db.js';
import { extraerDatosReceta } from '../services/ai/index.js';

export function validarReglasLegalesReceta(datos = {}) {
  const errores = [];

  const esDigital = datos.esDigital !== undefined ? Boolean(datos.esDigital) : true;
  if (!esDigital) {
    errores.push('La receta debe ser en formato digital.');
  }

  const codigo = datos.codigoBarras || datos.codigoBarra;
  if (!codigo || String(codigo).trim() === '') {
    errores.push('La receta debe contener un codigo de barras legible.');
  }

  const matricula = datos.matriculaMedico || datos.medicoMatricula;
  if (!matricula || String(matricula).trim() === '') {
    errores.push('La receta debe contener la matricula o firma y sello del medico identificable.');
  }

  if (!datos.fechaEmision) {
    errores.push('La fecha de emision de la receta es obligatoria.');
  } else {
    const fecha = new Date(datos.fechaEmision);
    if (isNaN(fecha.getTime())) {
      errores.push('La fecha de emision de la receta no es valida.');
    } else {
      const hoy = new Date();
      hoy.setHours(23, 59, 59, 999);
      const diffMs = hoy.getTime() - fecha.getTime();
      const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDias < 0) {
        errores.push('La fecha de emision no puede ser posterior a la fecha actual.');
      } else if (diffDias > 30) {
        errores.push(`La receta ha vencido. Tiene ${diffDias} dias desde su emision (maximo permitido: 30 dias).`);
      }
    }
  }

  return {
    esValida: errores.length === 0,
    errores,
    motivoRechazo: errores.length > 0 ? errores.join('. ') : null
  };
}

export const procesarYValidarReceta = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Debe subir un archivo de receta.' });
    }

    let datosExtraidos = null;
    let errorIA = null;

    try {
      datosExtraidos = await extraerDatosReceta(req.file.path, req.file.mimetype);
    } catch (aiErr) {
      errorIA = aiErr.message;
      console.error('Fallo en la llamada a Gemini Vision API:', aiErr.message);
    }

    if (!datosExtraidos) {
      return res.status(200).json({
        mensaje: 'Archivo recibido. La extraccion automatica por IA no estuvo disponible. Se requiere carga manual.',
        esValida: false,
        errores: ['Extraccion automatica no disponible: ' + errorIA],
        motivoRechazo: 'Extraccion automatica no disponible: ' + errorIA,
        errorIA: errorIA || null,
        datosExtraidos: {
          nombreCliente: null,
          dniCliente: null,
          telefonoCliente: null,
          fechaEmision: null,
          codigoBarra: null,
          medicoNombre: null,
          medicoMatricula: null,
          principioActivo: null,
          dosis: null,
          csp: null,
          urgente: false,
          esLegible: false,
          observaciones: 'Carga manual requerida: ' + (errorIA || 'API Key no configurada o error de lectura.')
        },
        archivo: {
          filename: req.file.filename,
          url: `/uploads/recetas/${req.file.filename}`,
          path: req.file.path
        }
      });
    }

    const resultadoValidacion = validarReglasLegalesReceta({
      esDigital: true,
      codigoBarras: datosExtraidos.codigoBarra,
      matriculaMedico: datosExtraidos.medicoMatricula,
      fechaEmision: datosExtraidos.fechaEmision
    });

    return res.status(200).json({
      mensaje: resultadoValidacion.esValida ? 'Receta procesada y valida.' : 'Receta procesada pero no valida.',
      esValida: resultadoValidacion.esValida,
      errores: resultadoValidacion.errores,
      motivoRechazo: resultadoValidacion.motivoRechazo,
      datosExtraidos,
      archivo: {
        filename: req.file.filename,
        url: `/uploads/recetas/${req.file.filename}`,
        path: req.file.path
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar la receta: ' + error.message });
  }
};

export const createReceta = async (req, res) => {
  try {
    const data = req.body;
    let esValida = data.esValida;
    let motivoRechazo = data.motivoRechazo;

    if (esValida === undefined) {
      const validacion = validarReglasLegalesReceta(data);
      esValida = validacion.esValida;
      motivoRechazo = validacion.motivoRechazo;
    }

    const nuevaReceta = await db.Receta.create({
      codigoBarras: data.codigoBarras || data.codigoBarra || null,
      matriculaMedico: data.matriculaMedico || data.medicoMatricula || null,
      imagenUrl: data.imagenUrl || null,
      selloImagenUrl: data.selloImagenUrl || null,
      esDigital: data.esDigital !== undefined ? Boolean(data.esDigital) : true,
      fechaEmision: data.fechaEmision || null,
      esValida: Boolean(esValida),
      motivoRechazo: motivoRechazo || null
    });

    return res.status(201).json({
      mensaje: 'Receta guardada exitosamente.',
      receta: nuevaReceta
    });
  } catch (error) {
    return res.status(400).json({ error: 'Error al guardar la receta: ' + error.message });
  }
};

export const getRecetaById = async (req, res) => {
  try {
    const receta = req.recurso;
    await receta.reload({
      include: [{ model: db.Pedido, as: 'pedido' }]
    });
    return res.status(200).json(receta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRecetas = async (req, res) => {
  try {
    const recetas = await db.Receta.findAll({
      order: [['id', 'DESC']]
    });
    return res.status(200).json(recetas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  validarReglasLegalesReceta,
  procesarYValidarReceta,
  createReceta,
  getRecetaById,
  getRecetas
};
