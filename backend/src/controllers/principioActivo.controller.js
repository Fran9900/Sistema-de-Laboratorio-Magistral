import db from "../config/db.js";

export const getPrincipioActivoById = async (req, res) => {
  try {
    const { id } = req.body;
      const principioActivo = await db.PrincipioActivo.findByPk(id);
    res.status(200).json(principioActivo);
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
        const { id } = req.params.id
        const principioActivo = await db.PrincipioActivo.findByPk(id)
        await principioActivo.update({stockDisponible : cantidad})
        return res.status(200).json({
        mensaje: `Stock de ${principioActivo.nombre} actualizado correctamente.`,
        principioActivo
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el stock: ' + error.message });
    }
}