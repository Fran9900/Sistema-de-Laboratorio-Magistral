'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    recetaId: DataTypes.INTEGER,
    principioActivoId: DataTypes.INTEGER,
    nombreCliente: DataTypes.STRING,
    telefonoCliente: DataTypes.STRING,
    origenPedido: DataTypes.ENUM,
    precio: DataTypes.DECIMAL,
    dosis: DataTypes.STRING,
    csp: DataTypes.STRING,
    urgente: DataTypes.BOOLEAN,
    pinControl: DataTypes.STRING,
    diaHoraRetiro: DataTypes.DATE,
    estadoPedido: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};