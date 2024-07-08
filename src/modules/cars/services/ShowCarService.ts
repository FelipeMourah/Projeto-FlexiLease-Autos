import { ICar } from '@modules/cars/domain/models/ICar';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class ShowCarService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(id: string): Promise<ICar | null> {
    const car = await this.carsRepository.findById(id);
    return car;
  }
}

export { ShowCarService };
