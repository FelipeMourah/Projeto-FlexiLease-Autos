import { Request, Response } from 'express';
import { CarsRepository } from '@modules/cars/infra/mongoose/repositories/carsRepository';
import { CreateCarService } from '@modules/cars/services/CreateCarService';
import { ListCarsService } from '@modules/cars/services/ListCarsService';
import { ShowCarService } from '@modules/cars/services/ShowCarService';
import { UpdateCarService } from '@modules/cars/services/UpdateCarService';
import { DeleteCarService } from '@modules/cars/services/DeleteCarService';
import { UpdateCarAccessoryService } from '@modules/cars/services/UpdateCarAccessoryService';

class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = request.body;

    const carsRepository = new CarsRepository();
    const createCarService = new CreateCarService(carsRepository);

    const newCarData = {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    };

    try {
      const createdCar = await createCarService.execute(newCarData);
      return response.status(201).json(createdCar);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return response.status(400).json({ error: errorMessage });
    }
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const carsRepository = new CarsRepository();
    const listCarsService = new ListCarsService(carsRepository);

    const cars = await listCarsService.execute();
    return response.status(200).json(cars);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const carsRepository = new CarsRepository();
    const showCarService = new ShowCarService(carsRepository);

    const car = await showCarService.execute(id);
    if (!car) {
      return response.status(404).json({ error: 'Car not found' });
    }

    return response.status(200).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = request.body;

    const carsRepository = new CarsRepository();
    const updateCarService = new UpdateCarService(carsRepository);

    const updateCarData = {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    };

    try {
      const updatedCar = await updateCarService.execute(id, updateCarData);
      return response.status(200).json(updatedCar);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return response.status(400).json({ error: errorMessage });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const carsRepository = new CarsRepository();
    const deleteCarService = new DeleteCarService(carsRepository);

    try {
      await deleteCarService.execute(id);
      return response.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return response.status(400).json({ error: errorMessage });
    }
  }

  public async updateAccessory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { carId, accessoryId } = request.params;
    const { description } = request.body;

    const carsRepository = new CarsRepository();
    const updateCarAccessoryService = new UpdateCarAccessoryService(
      carsRepository,
    );

    try {
      const updatedCar = await updateCarAccessoryService.execute(
        carId,
        accessoryId,
        description,
      );
      return response.status(200).json(updatedCar);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return response.status(400).json({ error: errorMessage });
    }
  }
}

export { CarsController };
