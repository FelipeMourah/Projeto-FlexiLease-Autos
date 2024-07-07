import Reserve from '@modules/reserves/infra/mongoose/entities/Reserves';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import AppError from '@shared/errors/AppError';

class ShowReserveService {
  public async execute(id: string): Promise<IReserve | null> {
    try {
      const reserve = await Reserve.findById(id);
      if (!reserve) {
        throw new AppError(404, 'Not Found', 'Reserve not found');
      }
      return reserve.toObject() as IReserve;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error in ShowReserveService: ${error.message}`);
        throw new AppError(500, 'Internal Server Error', error.message);
      }
      throw error;
    }
  }
}

export { ShowReserveService };
