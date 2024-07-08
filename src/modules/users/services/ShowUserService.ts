import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class ShowUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export { ShowUserService };
