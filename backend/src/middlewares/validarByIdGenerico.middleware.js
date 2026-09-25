const validarById = (modelo) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      if (isNaN(id) || !Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'El id debe ser numerico.' });
      }
      const instance = await modelo.findByPk(id);
      if (!instance) {
        return res.status(404).json({ error: `El registro con id ${id} no fue encontrado.` });
      }
      req.recurso = instance;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Error en la validacion de id: ' + error.message });
    }
  };
};

export default validarById;