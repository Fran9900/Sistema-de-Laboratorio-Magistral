"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PedidoDrogueria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PedidoDrogueria.belongsTo(models.Pedido, {
        foreignKey: "pedidoId",
        as: "pedido",
      });
      PedidoDrogueria.belongsTo(models.PrincipioActivo, {
        foreignKey: "principioActivoId",
        as: "principioActivo",
      });
    }
  }
  PedidoDrogueria.init(
    {
      pedidoId: DataTypes.INTEGER,
      principioActivoId: DataTypes.INTEGER,
      cantidadSolicitada: DataTypes.STRING,
      estadoSolicitud: DataTypes.ENUM('pendiente', 'enviado_api', 'confirmado_drogueria', 'fallido'),
      respuestaApi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "PedidoDrogueria",
    },
  );
  return PedidoDrogueria;
};
