import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { ICreateReserve } from '@modules/reserves/domain/models/ICreateReserve';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { User } from '@modules/users/infra/mongoose/entities/User';

class CreateReserveService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static execute(_arg0: {
    id_user: string;
    id_car: string;
    start_date: Date;
    end_date: Date;
    value_per_day: number;
    final_value: number;
  }) {
    throw new Error('Method not implemented.');
  }
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({
    id_user,
    id_car,
    start_date,
    end_date,
    value_per_day,
  }: ICreateReserve): Promise<IReserve> {
    // Verificar se o usuário existe
    const user = await User.findById(id_user);
    if (!user) {
      throw new Error('User not found');
    }

    // Verificar se o carro existe
    const car = await Car.findById(id_car);
    if (!car) {
      throw new Error('Car not found');
    }

    // Verifica se o usuário possui uma carteira de motorista
    if (!user.qualified) {
      throw new Error('User no qualified');
    }

    // Criar uma reserva
    const timeDiff = Math.abs(end_date.getTime() - start_date.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const final_value = value_per_day * diffDays;
    const reserve = await this.reserveRepository.create({
      id_user,
      id_car,
      start_date,
      end_date,
      value_per_day,
      final_value,
      id: '',
    });

    return reserve;
  }
}

export { CreateReserveService };
