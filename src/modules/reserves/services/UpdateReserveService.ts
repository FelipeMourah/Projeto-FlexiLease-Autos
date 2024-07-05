import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { IUpdateReserve } from '@modules/reserves/domain/models/IUpdateReserve';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { User } from '@modules/users/infra/mongoose/entities/User';

class UpdateReserveService {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute(id: string, data: IUpdateReserve): Promise<IReserve> {
    if (data.id_user) {
      // Verifica se o usuário existe
      const user = await User.findById(data.id_user);
      if (!user) {
        throw new Error('User not found');
      }

      // Verifica se o usuário possui uma carteira de motorista
      if (!user.qualified) {
        throw new Error('User does not have a driver license');
      }
    }

    if (data.id_car) {
      // Verifica se o carro existe
      const car = await Car.findById(data.id_car);
      if (!car) {
        throw new Error('Car not found');
      }
    }

    const updatedReserve = await this.reserveRepository.update(id, data);

    if (!updatedReserve) {
      throw new Error('Reserve not found');
    }

    return updatedReserve;
  }
}

export { UpdateReserveService };
