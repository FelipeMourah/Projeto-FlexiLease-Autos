import { User } from '@modules/users/infra/mongoose/entities/User';
import { IUser } from '../domain/models/IUser';

class ShowUserService {
  public async execute(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toObject() as IUser;
  }
}

export { ShowUserService };
