import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class ListUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}

export { ListUserService };
