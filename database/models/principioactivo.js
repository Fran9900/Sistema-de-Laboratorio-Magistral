"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrincipioActivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PrincipioActivo.hasMany(models.Pedido, {
        foreignKey: "principioActivoId",
        as: "pedidos",
      });
      PrincipioActivo.hasMany(models.PedidoDrogueria, {
        foreignKey: "principioActivoId",
        as: "pedidosDrogueria",
      });
    }
  }
  PrincipioActivo.init(
    {
      nombre: DataTypes.STRING,
      stockDisponible: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PrincipioActivo",
    },
  );
  return PrincipioActivo;
};
