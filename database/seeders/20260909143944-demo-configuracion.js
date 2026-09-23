'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ConfiguracionSistemas', [
      {
        clave: 'dias_validez_receta_max',
        valor: '30',
        descripcion: 'Dias maximos de validez de una receta desde su emision',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'tiempo_retiro_con_stock_hs',
        valor: '24',
        descripcion: 'Horas estimadas de retiro para pedidos con stock disponible',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'tiempo_retiro_sin_stock_hs',
        valor: '48',
        descripcion: 'Horas estimadas de retiro para pedidos que requieren solicitud a drogueria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave: 'longitud_pin_control',
        valor: '4',
        descripcion: 'Cantidad de digitos del PIN unico de control para talonario',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ConfiguracionSistemas', null, {});
  }
};
