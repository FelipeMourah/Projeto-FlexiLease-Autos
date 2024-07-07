import { User } from '@modules/users/infra/mongoose/entities/User';
import { IUser } from '../domain/models/IUser';

class ListUserService {
  public async execute(): Promise<IUser[]> {
    const users = await User.find();
    return users.map((user) => user.toObject() as IUser);
  }
}

export { ListUserService };
