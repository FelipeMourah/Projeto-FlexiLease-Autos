import { container } from 'tsyringe';
import { IReserveRepository } from 'modules/reserves/domain/repositories/IReserveRepository';
import { ReservesRepository } from '@modules/reserves/infra/mongoose/repositories/ReservesRepository';
import { UserRepository } from 'modules/users/infra/mongoose/repositories/UserRepository';
import { IUserRepository } from 'modules/users/domain/repositories/IUserRepository';
import { ICarsRepository } from 'modules/cars/domain/repositories/ICarsRepository';
import { CarsRepository } from 'modules/cars/infra/mongoose/repositories/carsRepository';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IReserveRepository>(
  'ReserveRepository',
  ReservesRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
