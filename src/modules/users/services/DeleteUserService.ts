import { User } from '../infra/mongoose/entities/User';

export class DeleteUserService {
  public async delete(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  }
}
