'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fechaActual = new Date();

    // Receta válida: Emitida hace 10 días (dentro del plazo legal de 30 días)
    const fechaValida = new Date(fechaActual);
    fechaValida.setDate(fechaActual.getDate() - 10);

    // Receta vencida: Emitida hace 45 días (supera la RN-01 de 30 días)
    const fechaVencida = new Date(fechaActual);
    fechaVencida.setDate(fechaActual.getDate() - 45);

    await queryInterface.bulkInsert('Recetas', [
      {
        id: 1,
        codigoBarras: '7791234567890',
        matriculaMedico: 'MP-45892',
        imagenUrl: '/uploads/recetas/receta-demo-1.png',
        selloImagenUrl: '/uploads/recetas/receta-demo-1-sello.png',
        esDigital: true,
        fechaEmision: fechaValida.toISOString().split('T')[0],
        esValida: true,
        motivoRechazo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        codigoBarras: '7799876543210',
        matriculaMedico: 'MN-10293',
        imagenUrl: '/uploads/recetas/receta-demo-2.png',
        selloImagenUrl: '/uploads/recetas/receta-demo-2-sello.png',
        esDigital: false,
        fechaEmision: fechaActual.toISOString().split('T')[0],
        esValida: true,
        motivoRechazo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        codigoBarras: '7795555444333',
        matriculaMedico: 'MP-12345',
        imagenUrl: '/uploads/recetas/receta-demo-3.png',
        selloImagenUrl: null,
        esDigital: true,
        fechaEmision: fechaVencida.toISOString().split('T')[0],
        esValida: false,
        motivoRechazo: 'La receta supera los 30 días de antigüedad legal (RN-01).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        codigoBarras: null,
        matriculaMedico: null,
        imagenUrl: '/uploads/recetas/receta-demo-4.png',
        selloImagenUrl: null,
        esDigital: false,
        fechaEmision: fechaActual.toISOString().split('T')[0],
        esValida: false,
        motivoRechazo: 'Foto borrosa. Campos obligatorios no detectados por IA.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recetas', null, {});
  }
};