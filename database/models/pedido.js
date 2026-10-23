'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Receta, {
        foreignKey: 'recetaId',
        as: 'receta'
      });
      Pedido.belongsTo(models.PrincipioActivo, {
        foreignKey: 'principioActivoId',
        as: 'principioActivo'
      });
      Pedido.hasOne(models.Pago, {
        foreignKey: 'pedidoId',
        as: 'pago'
      });
      Pedido.hasMany(models.PedidoDrogueria, {
        foreignKey: 'pedidoId',
        as: 'solicitudesDrogueria'
      });
      Pedido.hasMany(models.Reclamo, {
        foreignKey: 'pedidoId',
        as: 'reclamos'
      });
    }
  }

  Pedido.init(
    {
      recetaId: DataTypes.INTEGER,
      principioActivoId: DataTypes.INTEGER,
      principioActivoTexto: DataTypes.STRING,
      nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dniCliente: DataTypes.STRING,
      telefonoCliente: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origenPedido: {
        type: DataTypes.ENUM('mostrador', 'telefono', 'email'),
        defaultValue: 'mostrador'
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      dosis: {
        type: DataTypes.STRING,
        allowNull: false
      },
      csp: {
        type: DataTypes.STRING,
        allowNull: false
      },
      urgente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      pinControl: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      diaHoraRetiro: {
        type: DataTypes.DATE,
        allowNull: false
      },
      estadoPedido: {
        type: DataTypes.ENUM('ingresado', 'pendiente_pago', 'en_preparacion', 'listo_retiro', 'entregado', 'cancelado'),
        defaultValue: 'ingresado'
      },
      numeroPreparado: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'Pedidos'
    }
  );

  return Pedido;
};
