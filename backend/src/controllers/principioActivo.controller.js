import db from "../config/db.js";

export const getPrincipioActivoById = async (req, res) => {
  try {
    res.status(200).json(req.recurso)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPrincipiosActivos = async (req, res) => {
    try {
        const principiosActivos = await db.PrincipioActivo.findAll()
        res.status(200).json(principiosActivos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const registrarPrincipioActivo = async (req, res) => {
    try {
        const { nombre, stockDisponible } = req.body
        if (!nombre) {
            res.status(400).json({message: 'El nombre es obligatorio'})
        }
        const nuevoPrincipioActivo = await db.PrincipioActivo.create(
            nombre,
            stockDisponible
        )
        res.status(201).json({message: 'Principio activo registrado correctamente', principioActivo: nuevoPrincipioActivo})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const actualizarStock = async (req, res) => {
    try {
        const {cantidad} = req.body
        const principioActivo = req.recurso
        await principioActivo.update({stockDisponible : Number(cantidad)})
        return res.status(200).json({
        mensaje: `Stock de ${principioActivo.nombre} actualizado correctamente.`,
        principioActivo
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el stock: ' + error.message });
    }
}