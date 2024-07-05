import express from 'express';
import { reservesRouter } from '@modules/reserves/infra/http/routes/reserves.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';

const app = express();

app.use(express.json());
app.use('/api/v1/reserve', reservesRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cars', carsRouter);
