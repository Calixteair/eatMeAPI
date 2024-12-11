const express = require('express');
const dishRoutes = require('./routes/dishRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderLineRoutes = require('./routes/orderLineRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de Swagger (OpenAPI)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de gestion de commandes',
      version: '1.0.0',
      description: 'API pour gérer les clients, commandes, et lignes de commande',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers où vous définissez les routes
};

const specs = swaggerJsdoc(options);

// Route pour afficher la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json());

// Routes
app.use('/api/dishes', dishRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-lines', orderLineRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("test");
});
