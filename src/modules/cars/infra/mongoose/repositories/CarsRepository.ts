import { ICar } from '@modules/cars/domain/models/ICar';
import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import { IUpdateCar } from '@modules/cars/domain/models/IUpdateCar';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { Model, Document, Types } from 'mongoose';

class CarsRepository {
  private readonly model: Model<ICar & Document>;

  constructor() {
    this.model = Car;
  }

  public async create(data: ICreateCar): Promise<ICar> {
    try {
      const car = new this.model(data);
      await car.save();
      return car;
    } catch (error) {
      console.error('Error creating car:', error);
      throw new Error('Error creating car');
    }
  }

  public async findAll(): Promise<ICar[]> {
    try {
      return this.model.find();
    } catch (error) {
      console.error('Error finding all cars:', error);
      throw new Error('Error finding all cars');
    }
  }

  public async findById(id: string): Promise<ICar | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
      }
      return this.model.findById(id);
    } catch (error) {
      console.error('Error finding car by ID:', error);
      throw new Error('Error finding car by ID');
    }
  }

  public async update(id: string, data: IUpdateCar): Promise<ICar | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
      }
      return this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error updating car:', error);
      throw new Error('Error updating car');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
      }
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw new Error('Error deleting car');
    }
  }
}

export { CarsRepository };
