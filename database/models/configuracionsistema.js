'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConfiguracionSistema extends Model {
    static associate(models) {}
  }

  ConfiguracionSistema.init(
    {
      clave: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ConfiguracionSistema',
      tableName: 'ConfiguracionSistemas'
    }
  );

  return ConfiguracionSistema;
};