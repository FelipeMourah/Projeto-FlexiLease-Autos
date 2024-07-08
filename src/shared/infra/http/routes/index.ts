import { Router } from 'express';
import UserRoutes from 'modules/users/infra/http/routes/User.routes';
import reservesRouter from 'modules/reserves/infra/http/routes/reserves.routes';
import carsRouter from 'modules/cars/infra/http/routes/cars.routes';
import errorHandler from '@shared/infra/http/middlewares/ErrorHandler';

const Routes = Router();

Routes.use('/users', UserRoutes);
Routes.use('/reserves', reservesRouter);
Routes.use('/cars', carsRouter);

Routes.use(errorHandler);
export default Routes;
