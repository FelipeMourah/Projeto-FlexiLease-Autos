import { User } from '../infra/mongoose/entities/User';
import { IAuthenticateUser } from '../domain/models/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthUserService {
  public async authenticate({
    email,
    password,
  }: IAuthenticateUser): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Credenciais inválidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
    return token;
  }
}
