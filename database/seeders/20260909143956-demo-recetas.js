'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fechaActual = new Date();

    // Fecha de hace 10 días (Receta Válida)
    const fechaValida = new Date(fechaActual);
    fechaValida.setDate(fechaActual.getDate() - 10);

    // Fecha de hace 45 días (Receta Vencida - RN-01)
    const fechaVencida = new Date(fechaActual);
    fechaVencida.setDate(fechaActual.getDate() - 45);

    await queryInterface.bulkInsert('recetas', [
      {
        id: 1,
        fechaEmision: fechaValida.toISOString().split('T')[0],
        codigoBarras: '7791234567890',
        medicoNombre: 'Dr. Roberto Gómez',
        medicoMatricula: 'MP-45892',
        esValida: true,
        esLegible: true,
        motivoRechazo: null,
        selloImagenUrl: '/uploads/recetas/receta-demo-1.png',
        observaciones: 'Tomar 1 cápsula cada 8 horas por 5 días.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        fechaEmision: fechaActual.toISOString().split('T')[0],
        codigoBarras: '7799876543210',
        medicoNombre: 'Dra. María Elena Walsh',
        medicoMatricula: 'MN-10293',
        esValida: true,
        esLegible: true,
        motivoRechazo: null,
        selloImagenUrl: '/uploads/recetas/receta-demo-2.png',
        observaciones: 'Jarabe pediátrico. Administrar 5ml con comida.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        fechaEmision: fechaVencida.toISOString().split('T')[0],
        codigoBarras: '7795555444333',
        medicoNombre: 'Dr. Carlos Bilardo',
        medicoMatricula: 'MP-12345',
        esValida: false,
        esLegible: true,
        motivoRechazo: 'La receta supera los 30 días de antigüedad legal (RN-01).',
        selloImagenUrl: '/uploads/recetas/receta-demo-vencida.png',
        observaciones: 'Receta prescripta hace más de un mes.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        fechaEmision: fechaActual.toISOString().split('T')[0],
        codigoBarras: null,
        medicoNombre: 'Dr. Desconocido',
        medicoMatricula: null,
        esValida: false,
        esLegible: false,
        motivoRechazo: 'Foto borrosa. Datos ilegibles extraídos por IA.',
        selloImagenUrl: '/uploads/recetas/receta-demo-ilegible.png',
        observaciones: 'Requiere verificación o carga manual por el operador.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recetas', null, {});
  }
};
