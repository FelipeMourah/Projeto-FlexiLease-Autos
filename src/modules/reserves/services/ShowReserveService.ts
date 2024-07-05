import { Reserve } from '@modules/reserves/infra/mongoose/entities/Reserves';
import { IReserve } from '@modules/reserves/domain/models/IReserve';

class ShowReserveService {
  public async execute(id: string): Promise<IReserve | null> {
    const reserve = await Reserve.findById(id);
    if (!reserve) {
      throw new Error('Reserve not found');
    }
    return reserve.toObject() as IReserve;
  }
}

export { ShowReserveService };
