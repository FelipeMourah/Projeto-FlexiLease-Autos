import { Model } from 'mongoose';
import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { ICreateReserve } from '@modules/reserves/domain/models/ICreateReserve';
import { IUpdateReserve } from '@modules/reserves/domain/models/IUpdateReserve';
import { Reserve } from '@modules/reserves/infra/mongoose/entities/Reserves';

class ReserveRepository implements IReserveRepository {
  private reserveModel: Model<IReserve>;

  constructor() {
    this.reserveModel = Reserve;
  }

  public async save(reserveData: IReserve): Promise<IReserve> {
    const reserve = new this.reserveModel(reserveData);
    await reserve.save();
    return reserve.toObject() as IReserve;
  }

  public async create(data: ICreateReserve): Promise<IReserve> {
    const reserve = await this.reserveModel.create(data);
    return reserve.toObject() as IReserve;
  }

  public async findById(id: string): Promise<IReserve | null> {
    const reserve = await this.reserveModel.findById(id);
    return reserve ? (reserve.toObject() as IReserve) : null;
  }

  public async findAll(query: object, options?: object): Promise<IReserve[]> {
    const reserves = await this.reserveModel.find(query, null, options);
    return reserves.map((reserve) => reserve.toObject() as IReserve);
  }

  public async update(
    id: string,
    data: IUpdateReserve,
  ): Promise<IReserve | null> {
    const reserve = await this.reserveModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return reserve ? (reserve.toObject() as IReserve) : null;
  }

  public async delete(id: string): Promise<void> {
    await this.reserveModel.findByIdAndDelete(id);
  }
}

export { ReserveRepository };
