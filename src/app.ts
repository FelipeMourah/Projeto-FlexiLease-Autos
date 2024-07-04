import express from 'express';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import userRoutes from '@modules/users/infra/http/routes/user.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
// Middleware to parse JSON
app.use(express.json());

//Routes
app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/users', userRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto FlexiLease Autos - Documentaion',
      version: '1.0.0',
      description:
        'O projeto consiste no desenvolvimento de uma FULL API REST para uma locadora de carros, utilizando as tecnologias e conhecimentos aprendidos nos cursos',
      contact: {
        name: 'Felipe Santos de Moura',
      },
      servers: [`http://localhost:${PORT}`],
    },
  },
  apis: ['./src/modules/cars/infra/http/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mongoUri =
  process.env.MONGO_URI ||
  'mongodb+srv://FelipeMourah:<password>@projeto-flexilease-auto.kxsxdcc.mongodb.net/?retryWrites=true&w=majority&appName=Projeto-FlexiLease-Autos';
const port = process.env.PORT || 3000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
