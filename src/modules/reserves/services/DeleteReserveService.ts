import { Reserve } from '@modules/reserves/infra/mongoose/entities/Reserves';

class DeleteReserveService {
  public async execute(id: string): Promise<void> {
    const reserve = await Reserve.findById(id);
    if (!reserve) {
      throw new Error('Reserve not found');
    }
    await Reserve.deleteOne({ _id: id });
  }
}

export { DeleteReserveService };
