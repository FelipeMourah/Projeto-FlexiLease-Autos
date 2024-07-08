import { IUpdateCar } from '@modules/cars/domain/models/IUpdateCar';
import { ICar } from '@modules/cars/domain/models/ICar';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class UpdateCarService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(id: string, data: IUpdateCar): Promise<ICar | null> {
    const car = await this.carsRepository.update(id, data);
    return car;
  }
}

export { UpdateCarService };
