import { Router } from 'express';
import { ReservesController } from '@modules/reserves/infra/http/controllers/ReserveController';
import { jwtMiddleware } from '@shared/infra/http/middlewares/jwtMiddleware';

const reservesRouter = Router();
const reservesController = new ReservesController();

reservesRouter.get('/', jwtMiddleware, reservesController.list);
reservesRouter.get('/:id', jwtMiddleware, reservesController.show);
reservesRouter.post('/', jwtMiddleware, reservesController.create);
reservesRouter.put('/:id', jwtMiddleware, reservesController.update);
reservesRouter.delete('/:id', jwtMiddleware, reservesController.delete);

export default reservesRouter;
