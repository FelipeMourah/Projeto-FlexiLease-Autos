import { Model, model, Schema } from 'mongoose';
import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { ICreateReserve } from '@modules/reserves/domain/models/ICreateReserve';
import { IUpdateReserve } from '@modules/reserves/domain/models/IUpdateReserve';
import { User } from '@modules/users/infra/mongoose/entities/User';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';

const ReserveSchema: Schema = new Schema({
  id_user: { type: Schema.Types.ObjectId, ref: User, required: true }, // 'User' deve ser a string do modelo de usuário no Mongoose
  id_car: { type: Schema.Types.ObjectId, ref: Car, required: true }, // 'Car' deve ser a string do modelo de carro no Mongoose
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  value_per_day: { type: Number, required: true },
  final_value: { type: Number, required: true },
});

const ReserveModel: Model<IReserve> = model<IReserve>('Reserve', ReserveSchema);

class ReservesRepository implements IReserveRepository {
  private reserveModel: Model<IReserve>;

  constructor() {
    this.reserveModel = ReserveModel;
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

export { ReservesRepository };
