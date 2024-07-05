import { Router } from 'express';
import { ReservationsController } from '@modules/reserves/infra/http/controllers/ReserveController';

const reservesRouter = Router();
const reservesController = new ReservationsController();

reservesRouter.get('/', reservesController.list);
reservesRouter.get('/:id', reservesController.show);
reservesRouter.post('/', reservesController.create);
reservesRouter.put('/:id', reservesController.update);
reservesRouter.delete('/:id', reservesController.delete);

export { reservesRouter };
