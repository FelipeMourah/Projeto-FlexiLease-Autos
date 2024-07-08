/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class DeleteUserService {
  execute(_id: string) {
    throw new Error('Method not implemented.');
  }
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async delete(cpf: string): Promise<void> {
    const user = await this.userRepository.findById(cpf);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(cpf);
  }
}

export { DeleteUserService };
