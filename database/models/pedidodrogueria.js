'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PedidoDrogueria extends Model {
    static associate(models) {
      PedidoDrogueria.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId',
        as: 'pedido'
      });
      PedidoDrogueria.belongsTo(models.PrincipioActivo, {
        foreignKey: 'principioActivoId',
        as: 'principioActivo'
      });
    }
  }

  PedidoDrogueria.init(
    {
      pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      principioActivoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cantidadSolicitada: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoSolicitud: {
        type: DataTypes.ENUM('pendiente', 'enviado_api', 'confirmado_drogueria', 'fallido'),
        defaultValue: 'pendiente'
      },
      respuestaApi: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'PedidoDrogueria',
      tableName: 'PedidoDroguerias'
    }
  );

  return PedidoDrogueria;
};
