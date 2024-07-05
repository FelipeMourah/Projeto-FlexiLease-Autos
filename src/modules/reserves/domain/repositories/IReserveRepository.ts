import { IReserve } from '../models/IReserve';
import { ICreateReserve } from '../models/ICreateReserve';
import { IUpdateReserve } from '../models/IUpdateReserve';

interface IReserveRepository {
  save(reserve: IReserve): unknown;
  create(data: ICreateReserve): Promise<IReserve>;
  findById(id: string): Promise<IReserve | null>;
  findAll(query: object, options?: object): Promise<IReserve[]>;
  update(id: string, data: IUpdateReserve): Promise<IReserve | null>;
  delete(id: string): Promise<void>;
}

export { IReserveRepository };
