import { ICar } from '@modules/cars/domain/models/ICar';
import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import { IUpdateCar } from '@modules/cars/domain/models/IUpdateCar';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
class CarsRepository {
  public async create(data: ICreateCar): Promise<ICar> {
    const car = new Car(data);
    await car.save();
    return car;
  }

  public async findAll(): Promise<ICar[]> {
    return Car.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    return Car.findById(id);
  }

  public async update(id: string, data: IUpdateCar): Promise<ICar | null> {
    return Car.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await Car.findByIdAndDelete(id);
  }
}

export { CarsRepository };
