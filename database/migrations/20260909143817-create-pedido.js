'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recetaId: {
        type: Sequelize.INTEGER
      },
      principioActivoId: {
        type: Sequelize.INTEGER
      },
      nombreCliente: {
        type: Sequelize.STRING
      },
      telefonoCliente: {
        type: Sequelize.STRING
      },
      origenPedido: {
        type: Sequelize.ENUM
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      dosis: {
        type: Sequelize.STRING
      },
      csp: {
        type: Sequelize.STRING
      },
      urgente: {
        type: Sequelize.BOOLEAN
      },
      pinControl: {
        type: Sequelize.STRING
      },
      diaHoraRetiro: {
        type: Sequelize.DATE
      },
      estadoPedido: {
        type: Sequelize.ENUM
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
    await queryInterface.dropTable('Pedidos');
  }
};