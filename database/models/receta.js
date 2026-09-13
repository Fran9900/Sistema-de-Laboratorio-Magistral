"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receta.hasOne(models.Pedido, { foreignKey: "recetaId", as: "pedido" });
    }
  }
  Receta.init(
    {
      codigoBarras: DataTypes.STRING,
      matriculaMedico: DataTypes.STRING,
      selloImagenUrl: DataTypes.STRING,
      esDigital: DataTypes.BOOLEAN,
      fechaEmision: DataTypes.DATEONLY,
      esValida: DataTypes.BOOLEAN,
      motivoRechazo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Receta",
    },
  );
  return Receta;
};
