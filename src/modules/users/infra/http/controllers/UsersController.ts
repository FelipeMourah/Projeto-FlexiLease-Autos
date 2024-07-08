import { Request, Response } from 'express';
import { CreateUserService } from '../../../services/CreateUserService';
import { AuthUserService } from '../../../services/AuthUserService';
import { ListUserService } from '../../../services/ListUserService';
import { ShowUserService } from '../../../services/ShowUserService';
import { UpdateUserService } from '../../../services/UpdateUserService';
import { DeleteUserService } from '../../../services/DeleteUserService';

const createUserService = new CreateUserService();
const authUserService = new AuthUserService();
const listUserService = new ListUserService();
const showUserService = new ShowUserService();
const updateUserService = new UpdateUserService();
const deleteUserService = new DeleteUserService();

export class UsersController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await createUserService.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const token = await authUserService.authenticate(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }

  public async list(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await listUserService.execute();
      return res.status(200).json(users);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const user = await showUserService.execute(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = updateUserService.execute(req.params.id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await deleteUserService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: message });
    }
  }
}
