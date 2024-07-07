import { Router } from 'express';
import { ReservesController } from '@modules/reserves/infra/http/controllers/ReserveController';

const reservesRouter = Router();
const reservesController = new ReservesController();

reservesRouter.get('/', reservesController.list);
reservesRouter.get('/:id', reservesController.show);
reservesRouter.post('/', reservesController.create);
reservesRouter.put('/:id', reservesController.update);
reservesRouter.delete('/:id', reservesController.delete);

export default reservesRouter;
