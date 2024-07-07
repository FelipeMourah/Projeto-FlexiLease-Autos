import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { IUpdateReserve } from '@modules/reserves/domain/models/IUpdateReserve';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { User } from '@modules/users/infra/mongoose/entities/User';
import AppError from '@shared/errors/AppError';

class UpdateReserveService {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute(id: string, data: IUpdateReserve): Promise<IReserve> {
    try {
      // Se houver mudança de usuário, verificar se o novo usuário existe
      if (data.id_user) {
        const user = await User.findById(data.id_user);
        if (!user) {
          throw new AppError(404, 'Not Found', 'User not found');
        }
      }

      // Se houver mudança de carro, verificar se o novo carro existe
      if (data.id_car) {
        const car = await Car.findById(data.id_car);
        if (!car) {
          throw new AppError(404, 'Not Found', 'Car not found');
        }
      }

      // Atualizar a reserva
      const updatedReserve = await this.reserveRepository.update(id, data);

      if (!updatedReserve) {
        throw new AppError(404, 'Not Found', 'Reserve not found');
      }

      return updatedReserve;
    } catch (error) {
      console.error('Error in UpdateReserveService:', error);
      throw new AppError(
        500,
        'Internal Server Error',
        'Failed to update reserve',
      );
    }
  }
}

export { UpdateReserveService };
