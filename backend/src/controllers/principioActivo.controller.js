import db from "../config/db.js";

export const getPrincipioActivoById = async (req, res) => {
  try {
    res.status(200).json(req.recurso);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPrincipiosActivos = async (req, res) => {
  try {
    const principiosActivos = await db.PrincipioActivo.findAll({
      order: [['nombre', 'ASC']]
    });
    res.status(200).json(principiosActivos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registrarPrincipioActivo = async (req, res) => {
  try {
    const { nombre, stockDisponible } = req.body;
    if (!nombre || String(nombre).trim() === '') {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }
    const nombreLimpio = String(nombre).trim();
    const regexDosisOUnidades = /(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/i;
    if (regexDosisOUnidades.test(nombreLimpio)) {
      return res.status(400).json({
        message: "No se permiten unidades (g/mg) ni dosis en el nombre. Ingrese únicamente el nombre del principio activo."
      });
    }

    const nuevoPrincipioActivo = await db.PrincipioActivo.create({
      nombre: nombreLimpio,
      stockDisponible: stockDisponible ? Number(stockDisponible) : 0,
    });
    return res.status(201).json({
      message: "Principio activo registrado correctamente",
      principioActivo: nuevoPrincipioActivo,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const actualizarStock = async (req, res) => {
  try {
    const { cantidad, incrementar } = req.body;
    const principioActivo = req.recurso;
    const nuevoStock = incrementar
      ? Number(principioActivo.stockDisponible || 0) + Number(cantidad)
      : Number(cantidad);

    await principioActivo.update({ stockDisponible: nuevoStock });

    if (nuevoStock > 0) {
      await db.PedidoDrogueria.update(
        { estadoSolicitud: 'confirmado_drogueria' },
        {
          where: {
            principioActivoId: principioActivo.id,
            estadoSolicitud: 'pendiente'
          }
        }
      );
    }

    return res.status(200).json({
      mensaje: `Stock de ${principioActivo.nombre} actualizado correctamente.`,
      stockDisponible: nuevoStock,
      principioActivo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el stock: " + error.message });
  }
};
