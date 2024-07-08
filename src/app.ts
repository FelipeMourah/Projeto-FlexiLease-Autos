import 'reflect-metadata';
import '@shared/container/index';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import { connectToDatabase } from 'config/database';
import mongoose from 'mongoose';
import { Express } from 'express-serve-static-core';

const app = express();
dotenv.config();

const corsOptions = {
  origin: 'localhost:8000/Api/v1',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Swagger setup
setupSwagger(app);

const startServer = connectToDatabase;
mongoose.connect(
  'mongodb+srv://FelipeMourah:9SVG82eyQwOK4jqg@projeto-flexilease-auto.kxsxdcc.mongodb.net/?retryWrites=true&w=majority&appName=Projeto-FlexiLease-Autos',
);

startServer();

function setupSwagger(app: Express) {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8'),
  );
  app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
