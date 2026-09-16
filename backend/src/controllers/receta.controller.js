import db from "../../../database/models/index.js"

const procesarYValidarReceta = async(req, res) => {  
    try {
      // Procesar la imagen recibida con el servicio de Gemini
      const datosExtraidos = await procesarImagenReceta(req.file.buffer, req.file.mimetype);

      // Evaluar la RN-01 con los datos obtenidos por IA
      const resultadoValidacion = db.Receta.validarReceta({
        ...datosExtraidos,
        selloImagenUrl: `/uploads/recetas/${req.file.filename}`,
        esDigital: true
      });

      return res.status(200).json({
        mensaje: resultadoValidacion.esValida ? 'Receta procesada y válida' : 'Receta no válida',
        esValida: resultadoValidacion.esValida,
        errores: resultadoValidacion.errores,
        datosExtraidos,
        tempFileUrl: `/uploads/recetas/${req.file.filename}`
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error al procesar la receta: ' + error.message });
    }
  }

const createReceta = async(req,res) => {
    try{
        const data = req.body
        const nuevaReceta = await db.Receta.create(data)
        res.status(201).json({mensaje: "Receta guardada exitosamente", receta: nuevaReceta})
    } catch(e){
        res.status(400).json({ error: 'Error al guardar la receta: ' + error.message })
    }
    
}

const getRecetaById = async(req,res) => {
    try{
        const id = req.params.id
        const receta =  await db.Receta.findByPK(id, {
            include: [{ model: db.Pedido, as: 'pedido' }]
        })
        res.status(200).json(receta)
    } catch(e){
        res.status(500).json({ error: e.message })
    }
}

const getRecetas = async(req,res) => {
    try{
        const recetas = await db.Receta.findAll()
        res.status(200).json(recetas)
    } catch(e){
        res.status(500).json({ error: e.message })
    }
}
module.exports = {createReceta,getRecetaById,getRecetas}
