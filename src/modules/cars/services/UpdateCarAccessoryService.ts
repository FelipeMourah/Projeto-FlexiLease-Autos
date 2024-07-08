import { ICar } from '@modules/cars/domain/models/ICar';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';

class UpdateCarAccessoryService {
  constructor(private carsRepository: CarsRepository) {}

  public async execute(
    carId: string,
    accessoryId: string,
    description: string,
  ): Promise<ICar | null> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    const accessory = car.accessories.find((acc) => acc.id === accessoryId);

    if (accessory) {
      accessory.description = description;
    } else {
      car.accessories.push({ id: accessoryId, description });
    }

    await car.save();

    return car;
  }
}

export { UpdateCarAccessoryService };
