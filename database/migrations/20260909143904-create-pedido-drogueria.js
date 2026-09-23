'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PedidoDroguerias', {
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
      principioActivoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PrincipioActivos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      cantidadSolicitada: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estadoSolicitud: {
        type: Sequelize.ENUM('pendiente', 'enviado_api', 'confirmado_drogueria', 'fallido'),
        defaultValue: 'pendiente'
      },
      respuestaApi: {
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
    await queryInterface.dropTable('PedidoDroguerias');
  }
};