import Reserve from '@modules/reserves/infra/mongoose/entities/Reserves';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import AppError from '@shared/errors/AppError';

class DeleteReserveService {
  public async execute(id: string): Promise<void> {
    try {
      const deletedReserve: IReserve | null =
        await Reserve.findByIdAndDelete(id);
      if (!deletedReserve) {
        throw new AppError(404, 'Not Found', 'Reserve not found');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error in DeleteReserveService: ${error.message}`);
        throw new AppError(500, 'Internal Server Error', error.message);
      }
      throw error; // rethrow if it's not an instance of Error
    }
  }
}

export { DeleteReserveService };
