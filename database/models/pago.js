"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pago.belongsTo(models.Pedido, { foreignKey: "pedidoId", as: "pedido" });
    }
  }
  Pago.init(
    {
      pedidoId: DataTypes.INTEGER,
      metodoPago: DataTypes.ENUM('efectivo', 'transferencia'),
      estadoPago: DataTypes.ENUM('pendiente', 'validado', 'rechazado'),
      comprobanteUrl: DataTypes.STRING,
      fechaValidacion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Pago",
    },
  );
  return Pago;
};
