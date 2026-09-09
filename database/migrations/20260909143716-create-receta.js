'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Receta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigoBarras: {
        type: Sequelize.STRING
      },
      matriculaMedico: {
        type: Sequelize.STRING
      },
      selloImagenUrl: {
        type: Sequelize.STRING
      },
      esDigital: {
        type: Sequelize.BOOLEAN
      },
      fechaEmision: {
        type: Sequelize.DATEONLY
      },
      esValida: {
        type: Sequelize.BOOLEAN
      },
      motivoRechazo: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Receta');
  }
};