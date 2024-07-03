import { Router } from 'express';
import { CarsController } from '@modules/cars/infra/http/controllers/CarsController';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', carsController.create);
carsRouter.get('/', carsController.index);
carsRouter.get('/:id', carsController.show);
carsRouter.put('/:id', carsController.update);
carsRouter.delete('/:id', carsController.delete);
carsRouter.put(
  '/:carId/accessories/:accessoryId',
  carsController.updateAccessory,
);

export { carsRouter };
