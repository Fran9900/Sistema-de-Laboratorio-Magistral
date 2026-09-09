'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PrincipioActivos', [
      { nombre: 'Ibuprofeno 600mg', stockDisponible: 50, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Paracetamol 500mg', stockDisponible: 100, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Amoxicilina 500mg', stockDisponible: 0, createdAt: new Date(), updatedAt: new Date() }, // Sin stock -> dispara API
      { nombre: 'Morfina 10mg', stockDisponible: 0, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PrincipioActivos', null, {});
  }
};
