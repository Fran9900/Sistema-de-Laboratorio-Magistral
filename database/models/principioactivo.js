'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PrincipioActivo extends Model {
    static associate(models) {
      PrincipioActivo.hasMany(models.Pedido, {
        foreignKey: 'principioActivoId',
        as: 'pedidos'
      });
      PrincipioActivo.hasMany(models.PedidoDrogueria, {
        foreignKey: 'principioActivoId',
        as: 'pedidosDrogueria'
      });
    }
  }

  PrincipioActivo.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stockDisponible: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
      }
    },
    {
      sequelize,
      modelName: 'PrincipioActivo',
      tableName: 'PrincipioActivos'
    }
  );

  return PrincipioActivo;
};
