import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const UserRoutes = Router();
const usersController = new UsersController();

UserRoutes.post('/', usersController.register);
UserRoutes.post('/auth', usersController.login);
UserRoutes.get('/', usersController.list);
UserRoutes.get('/:id', usersController.show);
UserRoutes.put('/:id', usersController.update);
UserRoutes.delete('/:cpf', usersController.delete);

export default UserRoutes;
