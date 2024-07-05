import { Reserve } from '@modules/reserves/infra/mongoose/entities/Reserves';
import { IReserve } from '@modules/reserves/domain/models/IReserve';

class ListReservesService {
  public async execute(page: number, limit: number): Promise<IReserve[]> {
    const skips = limit * (page - 1);
    const reserves = await Reserve.find().skip(skips).limit(limit);
    return reserves.map((reserve) => reserve.toObject() as IReserve);
  }
}

export { ListReservesService };
