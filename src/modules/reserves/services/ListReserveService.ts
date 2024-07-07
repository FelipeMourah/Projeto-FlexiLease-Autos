import Reserve from '@modules/reserves/infra/mongoose/entities/Reserves';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import AppError from '@shared/errors/AppError';

class ListReservesService {
  public async execute(page: number, limit: number): Promise<IReserve[]> {
    try {
      const skips = limit * (page - 1);
      const reserves = await Reserve.find().skip(skips).limit(limit);
      if (!reserves) {
        throw new AppError(404, 'Not Found', 'No reserves found');
      }
      return reserves.map((reserve) => reserve.toObject() as IReserve);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error in ListReservesService: ${error.message}`);
        throw new AppError(500, 'Internal Server Error', error.message);
      }
      throw error; // rethrow if it's not an instance of Error
    }
  }
}

export { ListReservesService };
