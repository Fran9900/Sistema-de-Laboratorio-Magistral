'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId',
        as: 'pedido'
      });
    }
  }

  Pago.init(
    {
      pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metodoPago: {
        type: DataTypes.ENUM('efectivo', 'transferencia'),
        allowNull: false
      },
      estadoPago: {
        type: DataTypes.ENUM('pendiente', 'validado', 'rechazado'),
        defaultValue: 'pendiente'
      },
      comprobanteUrl: DataTypes.STRING,
      fechaValidacion: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Pago',
      tableName: 'Pagos'
    }
  );

  return Pago;
};
