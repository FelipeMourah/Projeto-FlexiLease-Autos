import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import { ICar } from '@modules/cars/domain/models/ICar';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class CreateCarService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(data: ICreateCar): Promise<ICar> {
    const car = await this.carsRepository.create(data);
    return car;
  }
}

export { CreateCarService };
