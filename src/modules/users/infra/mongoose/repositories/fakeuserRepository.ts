import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { v4 as uuid } from 'uuid';

class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];

  public async create(data: ICreateUser): Promise<IUser> {
    const user: IUser = {
      id: uuid(), // Gera um ID único usando UUID
      ...data,
      _id: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        uf: '',
      },
    };

    this.users.push(user);
    return user;
  }

  public async findAll(): Promise<IUser[]> {
    return this.users;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  public async findByCpf(cpf: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.cpf === cpf);
    return user || null;
  }

  public async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    };

    return this.users[userIndex];
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export { FakeUserRepository };
