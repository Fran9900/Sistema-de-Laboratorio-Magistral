'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recetas', {
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
      imagenUrl: {
        type: Sequelize.STRING
      },
      selloImagenUrl: {
        type: Sequelize.STRING
      },
      esDigital: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      fechaEmision: {
        type: Sequelize.DATEONLY
      },
      esValida: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Recetas');
  }
};