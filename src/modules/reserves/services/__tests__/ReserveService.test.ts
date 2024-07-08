import { FakeReserveRepository } from '../../infra/mongoose/repositories/fakereseveRepository';
import { CreateReserveService } from '../CreateReserveService';
import { ListReservesService } from '../ListReserveService';
import { DeleteReserveService } from '../DeleteReserveService';
import { ShowReserveService } from '../ShowReserveService';
import { UpdateReserveService } from '../UpdateReserveService';
import { ICreateReserve } from '@modules/reserves/domain/models/ICreateReserve';
import { IUpdateReserve } from '@modules/reserves/domain/models/IUpdateReserve';
import { IUser } from '@modules/users/domain/models/IUser';
import { User } from '@modules/users/infra/mongoose/entities/User';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { ICar } from '@modules/cars/domain/models/ICar';
import AppError from '@shared/errors/AppError';

describe('ReserveService', () => {
  let fakeReserveRepository: FakeReserveRepository;
  let createReserveService: CreateReserveService;
  let listReservesService: ListReservesService;
  let deleteReserveService: DeleteReserveService;
  let showReserveService: ShowReserveService;
  let updateReserveService: UpdateReserveService;

  beforeEach(() => {
    fakeReserveRepository = new FakeReserveRepository();
    createReserveService = new CreateReserveService(fakeReserveRepository);
    listReservesService = new ListReservesService(fakeReserveRepository);
    deleteReserveService = new DeleteReserveService(fakeReserveRepository);
    showReserveService = new ShowReserveService(fakeReserveRepository);
    updateReserveService = new UpdateReserveService(fakeReserveRepository);
  });

  it('should be able to create a new reserve', async () => {
    const userData: IUser = {
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      qualified: 'não',
      _id: '',
      birth: new Date('1979-05-03'),
      password: '',
      cep: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        uf: '',
      },
    };

    const carData: ICar = {
      id: 'car_id',
      model: 'Civic',
      color: 'black',
      value_per_day: '100',
      save: function (): unknown {
        throw new Error('Function not implemented.');
      },
      year: 2022,
      accessories: [],
      number_of_passengers: '5',
    };

    const user = await User.create(userData);
    const car = await Car.create(carData);

    const reserveData: ICreateReserve = {
      id_user: user.id,
      id_car: car.id,
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-07-20'),
      final_value: 500,
      value_per_day: 0,
    };

    const reserve = await createReserveService.execute(reserveData);

    expect(reserve).toHaveProperty('id');
    expect(reserve.id_user).toEqual(user.id);
    expect(reserve.id_car).toEqual(car.id);
    expect(reserve.start_date).toEqual(reserveData.start_date);
    expect(reserve.end_date).toEqual(reserveData.end_date);
    expect(reserve.value_per_day).toEqual(reserveData.value_per_day);
    expect(reserve.final_value).toEqual(reserveData.final_value);
  });

  it('should not be able to create a reserve with non-existing user', async () => {
    const reserveData: ICreateReserve = {
      id_user: 'non_existing_user_id',
      id_car: 'car_id',
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-07-20'),
      value_per_day: 100,
      final_value: 500,
    };

    await expect(
      createReserveService.execute(reserveData),
    ).rejects.toThrowError(AppError);
  });

  it('should not be able to create a reserve with non-existing car', async () => {
    const userData: IUser = {
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      qualified: 'sim',
      _id: '',
      birth: new Date('1979-05-03'),
      password: '',
      cep: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        uf: '',
      },
    };

    const user = await User.create(userData);

    const reserveData: ICreateReserve = {
      id_user: user.id,
      id_car: 'non_existing_car_id',
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-07-20'),
      value_per_day: 100,
      final_value: 500,
    };

    await expect(
      createReserveService.execute(reserveData),
    ).rejects.toThrowError(AppError);
  });

  it('should be able to list all reserves', async () => {
    const reserves = await listReservesService.execute(1, 10);

    expect(reserves).toEqual([]);
  });

  it('should be able to delete a reserve', async () => {
    const userData: IUser = {
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      qualified: 'não',
      _id: '',
      birth: new Date('2005-02-07'),
      password: '',
      cep: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        uf: '',
      },
    };

    const carData: ICar = {
      id: 'car_id',
      model: 'Civic',
      color: 'black',
      value_per_day: '100',
      save: function (): unknown {
        throw new Error('Function not implemented.');
      },
      year: 2022,
      accessories: [],
      number_of_passengers: '5',
    };

    const user = await User.create(userData);
    const car = await Car.create(carData);

    const reserveData: ICreateReserve = {
      id_user: user.id,
      id_car: car.id,
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-07-20'),
      value_per_day: 0,
      final_value: 500,
    };

    const createdReserve = await createReserveService.execute(reserveData);

    await deleteReserveService.execute(createdReserve.id);

    const deletedReserve = await showReserveService.execute(createdReserve.id);

    expect(deletedReserve).toBeNull();
  });

  it('should be able to update a reserve', async () => {
    const userData: IUser = {
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      qualified: 'não',
      _id: '',
      birth: new Date('2004-04-21'),
      password: '',
      cep: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        uf: '',
      },
    };

    const carData: ICar = {
      id: 'car_id',
      model: 'Civic',
      color: 'black',
      value_per_day: '100',
      save: function (): unknown {
        throw new Error('Function not implemented.');
      },
      year: 2022,
      accessories: [],
      number_of_passengers: '5',
    };

    const user = await User.create(userData);
    const car = await Car.create(carData);

    const reserveData: ICreateReserve = {
      id_user: user.id,
      id_car: car.id,
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-07-20'),
      value_per_day: 100,
      final_value: 500,
    };

    const createdReserve = await createReserveService.execute(reserveData);

    const updatedReserveData: IUpdateReserve = {
      id_user: user.id,
      id_car: car.id,
      start_date: new Date('2024-07-16'),
      end_date: new Date('2024-07-21'),
      value_per_day: 100,
      id: '1',
    };

    const updatedReserve = await updateReserveService.execute(
      createdReserve.id,
      updatedReserveData,
    );

    expect(updatedReserve.start_date).toEqual(updatedReserveData.start_date);
    expect(updatedReserve.end_date).toEqual(updatedReserveData.end_date);
    expect(updatedReserve.value_per_day).toEqual(
      updatedReserveData.value_per_day,
    );
  });
});
