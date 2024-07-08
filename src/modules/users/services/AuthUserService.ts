import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IAuthenticateUser } from '@modules/users/domain/models/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class AuthUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async authenticate({
    email,
    password,
  }: IAuthenticateUser): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
    return token;
  }
}

export { AuthUserService };
