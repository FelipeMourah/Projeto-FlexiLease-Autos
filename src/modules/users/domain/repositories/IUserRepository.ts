import { IUser } from '../models/IUser';

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
  findByCpf(cpf: string): Promise<IUser | null>;
}
