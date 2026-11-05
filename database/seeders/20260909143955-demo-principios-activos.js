'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PrincipioActivos', [
      { nombre: 'Ibuprofeno', stockDisponible: 50.00, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Paracetamol', stockDisponible: 100.00, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Amoxicilina', stockDisponible: 50.00, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Morfina', stockDisponible: 0.00, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PrincipioActivos', null, {});
  }
};
