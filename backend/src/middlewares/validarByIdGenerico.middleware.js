const validarById = (modelo)=>{
    return async(req,res,next)=>{
        const id = req.params.id
        const instance = await modelo.findByPk(id)
        if (isNaN(id)){
            res.status(400).json({error_message: "El id debe ser numerico"})
        }
        else if(!instance){
            res.status(404).json({error_message: `El id ${id} no fue encontrado`})
            return
        }
        next()
    }
}
module.exports = validarById