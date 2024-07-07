import 'reflect-metadata';
import '@shared/container/index';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import cors from 'cors';
import './server';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
