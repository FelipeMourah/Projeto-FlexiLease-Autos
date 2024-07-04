import { User } from '@modules/users/infra/mongoose/entities/User';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUpdateUser } from '@modules/users/domain/models/IUpdateUser';
import { IUser } from '@modules/users/domain/models/IUser';

class usersRepository {
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

  public async update(
    id: string,
    _name: string | undefined,
    _password: string | undefined,
    _cep: string | undefined,
    _qualified: string | undefined,
    data: IUpdateUser,
  ): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user ? (user.toObject() as IUser) : null;
  }

  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}

export { usersRepository };
