'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reclamo extends Model {
    static associate(models) {
      Reclamo.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId',
        as: 'pedido'
      });
    }
  }

  Reclamo.init(
    {
      pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: DataTypes.TEXT,
      estado: {
        type: DataTypes.ENUM('abierto', 'en_revision', 'resuelto'),
        defaultValue: 'abierto'
      }
    },
    {
      sequelize,
      modelName: 'Reclamo',
      tableName: 'Reclamos'
    }
  );

  return Reclamo;
};
