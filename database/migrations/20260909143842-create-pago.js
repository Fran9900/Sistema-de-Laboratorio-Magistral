'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pedidos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      metodoPago: {
        type: Sequelize.ENUM('efectivo', 'transferencia'),
        allowNull: false
      },
      estadoPago: {
        type: Sequelize.ENUM('pendiente', 'validado', 'rechazado'),
        defaultValue: 'pendiente'
      },
      comprobanteUrl: {
        type: Sequelize.STRING
      },
      fechaValidacion: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Pagos');
  }
};