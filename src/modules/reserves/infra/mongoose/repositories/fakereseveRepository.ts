/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReserveRepository } from '@modules/reserves/domain/repositories/IReserveRepository';
import { IReserve } from '@modules/reserves/domain/models/IReserve';
import { ICreateReserve } from '@modules/reserves/domain/models/ICreateReserve';

class FakeReserveRepository implements IReserveRepository {
  save(reserve: IReserve): unknown {
    throw new Error('Method not implemented.');
  }
  private reserves: IReserve[] = [];

  public async create(data: ICreateReserve): Promise<IReserve> {
    const reserve: IReserve = {
      ...data,
      id: Math.random().toString(36).substr(2, 9), // Simulating a random ID
    };

    this.reserves.push(reserve);
    return reserve;
  }

  public async findAll(): Promise<IReserve[]> {
    return this.reserves;
  }

  public async findById(id: string): Promise<IReserve | null> {
    const reserve = this.reserves.find((reserve) => reserve.id === id);
    return reserve || null;
  }

  public async update(
    id: string,
    data: Partial<IReserve>,
  ): Promise<IReserve | null> {
    const reserveIndex = this.reserves.findIndex(
      (reserve) => reserve.id === id,
    );
    if (reserveIndex === -1) return null;

    this.reserves[reserveIndex] = {
      ...this.reserves[reserveIndex],
      ...data,
    };

    return this.reserves[reserveIndex];
  }

  public async delete(id: string): Promise<void> {
    this.reserves = this.reserves.filter((reserve) => reserve.id !== id);
  }
}

export { FakeReserveRepository };
