'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Receta extends Model {
    static associate(models) {
      Receta.hasOne(models.Pedido, {
        foreignKey: 'recetaId',
        as: 'pedido'
      });
    }
  }

  Receta.init(
    {
      codigoBarras: DataTypes.STRING,
      matriculaMedico: DataTypes.STRING,
      imagenUrl: DataTypes.STRING,
      selloImagenUrl: DataTypes.STRING,
      esDigital: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      fechaEmision: DataTypes.DATEONLY,
      esValida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      motivoRechazo: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Receta',
      tableName: 'Recetas'
    }
  );

  return Receta;
};
