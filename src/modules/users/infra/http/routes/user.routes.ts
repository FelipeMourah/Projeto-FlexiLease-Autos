import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post('/', usersController.register);
userRoutes.post('/auth', usersController.login);
userRoutes.get('/', usersController.list);
userRoutes.get('/:id', usersController.show);
userRoutes.put('/:id', usersController.update);
userRoutes.delete('/:id', usersController.delete);

export default userRoutes;
