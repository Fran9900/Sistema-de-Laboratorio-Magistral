"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reclamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reclamo.belongsTo(models.Pedido, {
        foreignKey: "pedidoId",
        as: "pedido",
      });
    }
  }
  Reclamo.init(
    {
      pedidoId: DataTypes.INTEGER,
      motivo: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      estado: DataTypes.ENUM('abierto', 'en_revision', 'resuelto'),
    },
    {
      sequelize,
      modelName: "Reclamo",
    },
  );
  return Reclamo;
};
