import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { User } from '../entities/User';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUpdateUser } from '@modules/users/domain/models/IUpdateUser';

class UserRepository implements IUserRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    return user ? (user.toObject() as IUser) : null;
  }

  public async findByCpf(cpf: string): Promise<IUser | null> {
    const user = await User.findOne({ cpf });
    return user ? (user.toObject() as IUser) : null;
  }

  public async create(data: ICreateUser): Promise<IUser> {
    const user = new User(data);
    await user.save();
    return user.toObject() as IUser;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user ? (user.toObject() as IUser) : null;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await User.find();
    return users.map((user) => user.toObject() as IUser);
  }

  public async update(id: string, data: IUpdateUser): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user ? (user.toObject() as IUser) : null;
  }

  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}

export { UserRepository };
