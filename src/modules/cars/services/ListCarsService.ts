import { ICar } from '@modules/cars/domain/models/ICar';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class ListCarsService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(): Promise<ICar[]> {
    const cars = await this.carsRepository.findAll();
    return cars;
  }
}

export { ListCarsService };
