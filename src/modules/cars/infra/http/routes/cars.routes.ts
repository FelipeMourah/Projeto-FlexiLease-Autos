import { Router } from 'express';
import { CarsController } from '@modules/cars/infra/http/controllers/CarsController';
import { jwtMiddleware } from '@shared/infra/http/middlewares/jwtMiddleware';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', jwtMiddleware, carsController.create);
carsRouter.get('/', jwtMiddleware, carsController.index);
carsRouter.get('/:id', jwtMiddleware, carsController.show);
carsRouter.put('/:id', jwtMiddleware, carsController.update);
carsRouter.delete('/:id', jwtMiddleware, carsController.delete);
carsRouter.put(
  '/:carId/accessories/:accessoryId',
  jwtMiddleware,
  carsController.updateAccessory,
);

export default carsRouter;
