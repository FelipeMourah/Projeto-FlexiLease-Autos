import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import { IUpdateCar } from '@modules/cars/domain/models/IUpdateCar';
import { ICar } from '@modules/cars/domain/models/ICar';

class FakeCarsRepository {
  private cars: ICar[] = [];
  private nextId = 1; // Contador para gerar IDs únicos

  public async create(data: ICreateCar): Promise<ICar> {
    const car: ICar = {
      id: String(this.nextId++),
      model: data.model,
      color: data.color,
      year: data.year,
      value_per_day: data.value_per_day,
      accessories: [],
      number_of_passengers: data.number_of_passengers,
      save: function (): unknown {
        throw new Error('Function not implemented.');
      },
    };

    this.cars.push(car);
    return car;
  }

  public async findAll(): Promise<ICar[]> {
    return this.cars;
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.cars.find((car) => car.id === id) || null;
  }

  public async update(id: string, data: IUpdateCar): Promise<ICar | null> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) return null;

    this.cars[carIndex] = { ...this.cars[carIndex], ...data };
    return this.cars[carIndex];
  }

  public async delete(id: string): Promise<void> {
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}

export { FakeCarsRepository };
