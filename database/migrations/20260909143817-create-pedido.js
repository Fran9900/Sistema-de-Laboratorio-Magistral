'use strict';

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
        type: Sequelize.INTEGER,
        references: {
          model: 'Recetas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      principioActivoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PrincipioActivos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      nombreCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dniCliente: {
        type: Sequelize.STRING
      },
      telefonoCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origenPedido: {
        type: Sequelize.ENUM('mostrador', 'telefono', 'email'),
        defaultValue: 'mostrador'
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      dosis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      csp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      urgente: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pinControl: {
        type: Sequelize.STRING(4),
        allowNull: false
      },
      diaHoraRetiro: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estadoPedido: {
        type: Sequelize.ENUM('ingresado', 'pendiente_pago', 'en_preparacion', 'listo_retiro', 'entregado', 'cancelado'),
        defaultValue: 'ingresado'
      },
      numeroPreparado: {
        type: Sequelize.STRING
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