import { ICar } from '../models/ICar';
import { ICreateCar } from '../models/ICreateCar';

export interface ICarsRepository {
  create(data: ICreateCar): Promise<ICar>;
  findById(id: string): Promise<ICar | null>;
  findAll(): Promise<ICar[]>;
  update(id: string, data: Partial<ICar>): Promise<ICar | null>;
  delete(id: string): Promise<void>;
}
