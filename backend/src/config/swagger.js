import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Laboratorio Magistral',
      version: '1.0.0',
      description: 'Documentación interactiva de endpoints para gestión de recetas, pedidos y stock de principios activos.',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor Local de Desarrollo',
      },
    ],
  },
  // Especifica la ruta a los archivos donde escribirás las anotaciones JSDoc
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📖 Documentación Swagger disponible en: http://localhost:4000/api-docs');
};