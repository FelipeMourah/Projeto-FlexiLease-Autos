import 'reflect-metadata';
import '@shared/container/index';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import cors from 'cors';
import './server';
import { connectToDatabase } from 'config/database';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
app.use(cors());

// Middleware
app.use(express.json());

// Swagger setup

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const startServer = connectToDatabase;
mongoose.connect(
  'mongodb+srv://FelipeMourah:9SVG82eyQwOK4jqg@projeto-flexilease-auto.kxsxdcc.mongodb.net/?retryWrites=true&w=majority&appName=Projeto-FlexiLease-Autos',
);

startServer();
