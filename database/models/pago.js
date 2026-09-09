'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pago.init({
    pedidoId: DataTypes.INTEGER,
    metodoPago: DataTypes.ENUM,
    estadoPago: DataTypes.ENUM,
    comprobanteUrl: DataTypes.STRING,
    fechaValidacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};