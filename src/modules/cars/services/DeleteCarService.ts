import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class DeleteCarService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(id: string): Promise<void> {
    await this.carsRepository.delete(id);
  }
}

export { DeleteCarService };
