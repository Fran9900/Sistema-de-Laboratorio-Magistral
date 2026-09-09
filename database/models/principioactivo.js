'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrincipioActivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PrincipioActivo.init({
    nombre: DataTypes.STRING,
    stockDisponible: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PrincipioActivo',
  });
  return PrincipioActivo;
};