import { FakeCarsRepository } from '@modules/cars/infra/mongoose/repositories/fakeCarsRepository';
import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import { IUpdateCar } from '@modules/cars/domain/models/IUpdateCar';
import { ICar } from '@modules/cars/domain/models/ICar';

describe('FakeCarsRepository', () => {
  let repository: FakeCarsRepository;

  beforeEach(() => {
    repository = new FakeCarsRepository();
  });

  it('should create a new car', async () => {
    const carData: ICreateCar = {
      model: 'Ferrari',
      color: 'Red',
      year: 2023,
      value_per_day: '1000',
      accessories: [],
      number_of_passengers: '2',
    };

    const createdCar = await repository.create(carData);

    expect(createdCar).toHaveProperty('id');
    expect(createdCar.model).toBe(carData.model);
    expect(createdCar.color).toBe(carData.color);
    expect(createdCar.year).toBe(carData.year);
    expect(createdCar.value_per_day).toBe(carData.value_per_day);
    expect(createdCar.accessories).toEqual(carData.accessories);
    expect(createdCar.number_of_passengers).toBe(carData.number_of_passengers);
  });

  it('should find all cars', async () => {
    const cars: ICar[] = [
      {
        id: '1',
        model: 'Ferrari',
        color: 'Red',
        year: 2023,
        value_per_day: '1000',
        accessories: [],
        number_of_passengers: '2',
        save: function (): unknown {
          throw new Error('Function not implemented.');
        },
      },
      {
        id: '2',
        model: 'Lamborghini',
        color: 'Yellow',
        year: 2024,
        value_per_day: '1200',
        accessories: [],
        number_of_passengers: '2',
        save: function (): unknown {
          throw new Error('Function not implemented.');
        },
      },
    ];

    cars.forEach(async (car) => {
      await repository.create(car as ICreateCar); // Adiciona carros diretamente para teste
    });

    const foundCars = await repository.findAll();

    expect(foundCars).toHaveLength(cars.length);
    expect(foundCars).toEqual(expect.arrayContaining(cars));
  });

  it('should find a car by ID', async () => {
    const carData: ICreateCar = {
      model: 'Ferrari',
      color: 'Red',
      year: 2023,
      value_per_day: '1000',
      accessories: [],
      number_of_passengers: '2',
    };

    const createdCar = await repository.create(carData);
    const foundCar = await repository.findById(createdCar.id);

    expect(foundCar).toBeDefined();
    expect(foundCar!.id).toBe(createdCar.id);
  });

  it('should update a car', async () => {
    const carData: ICreateCar = {
      model: 'Ferrari',
      color: 'Red',
      year: 2023,
      value_per_day: '1000',
      accessories: [],
      number_of_passengers: '2',
    };

    const createdCar = await repository.create(carData);
    const updateData: IUpdateCar = {
      model: 'Updated Ferrari',
      color: 'Blue',
      number_of_passengers: '2',
    };

    const updatedCar = await repository.update(createdCar.id, updateData);

    expect(updatedCar).toBeDefined();
    expect(updatedCar!.id).toBe(createdCar.id);
    expect(updatedCar!.model).toBe(updateData.model);
    expect(updatedCar!.color).toBe(updateData.color);
  });

  it('should delete a car', async () => {
    const carData: ICreateCar = {
      model: 'Ferrari',
      color: 'Red',
      year: 2023,
      value_per_day: '1000',
      accessories: [],
      number_of_passengers: '2',
    };

    const createdCar = await repository.create(carData);
    await repository.delete(createdCar.id);

    const foundCar = await repository.findById(createdCar.id);
    expect(foundCar).toBeNull();
  });
});
