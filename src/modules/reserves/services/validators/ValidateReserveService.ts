import { Request, Response, NextFunction } from 'express';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';
import { User } from '@modules/users/infra/mongoose/entities/User';

async function ReserveValidator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const {
      id_user,
      id_car,
      start_date,
      end_date,
      value_per_day,
      final_value,
    } = request.body;

    if (
      !id_user ||
      !id_car ||
      !start_date ||
      !end_date ||
      !value_per_day ||
      !final_value
    ) {
      response.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Verifica se o usuário existe
    const user = await User.findById(id_user);
    if (!user) {
      response.status(400).json({ error: 'User not found' });
      return;
    }

    // Verifica se o usuário possui uma carteira de motorista
    if (!user.qualified) {
      response
        .status(400)
        .json({ error: 'User does not have a driver license' });
      return;
    }

    // Verifica se o carro existe
    const car = await Car.findById(id_car);
    if (!car) {
      response.status(400).json({ error: 'Car not found' });
      return;
    }

    next();
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}

export { ReserveValidator };
