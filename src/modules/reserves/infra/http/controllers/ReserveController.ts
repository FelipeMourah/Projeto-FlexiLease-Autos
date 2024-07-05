import { ReserveRepository } from '../../mongoose/repositories/ReservesRepository';
import { Request, Response } from 'express';
import { CreateReserveService } from '@modules/reserves/services/CreateReserveService';
import { UpdateReserveService } from '@modules/reserves/services/UpdateReserveService';
import { DeleteReserveService } from '@modules/reserves/services/DeleteReserveService';
import { ShowReserveService } from '@modules/reserves/services/ShowReserveService';
import { ListReservesService } from '@modules/reserves/services/ListReserveService';

export class ReservationsController {
  private reservationRepository: ReserveRepository;

  constructor() {
    this.reservationRepository = new ReserveRepository();
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      id_user,
      id_car,
      start_date,
      end_date,
      value_per_day,
      final_value,
    } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createReserveService = new CreateReserveService(
      this.reservationRepository,
    );
    try {
      const reserve = await CreateReserveService.execute({
        id_user,
        id_car,
        start_date,
        end_date,
        value_per_day,
        final_value,
      });
      return res.status(201).json({ id: reserve });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';
      return res.status(400).json({ error: errorMessage });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const updateReserveService = new UpdateReserveService(
      this.reservationRepository,
    );
    try {
      const Reserve = await updateReserveService.execute(id, data);

      if (!Reserve) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';
      return res.status(400).json({ error: errorMessage });
    }
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteReserveService = new DeleteReserveService();
    try {
      await deleteReserveService.execute(id);
      return res.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';
      return res.status(400).json({ error: errorMessage });
    }
  }
  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const showReserveService = new ShowReserveService();
    try {
      const reserve = await showReserveService.execute(id);

      if (!reserve) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      return res.json(reserve);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';
      return res.status(400).json({ error: errorMessage });
    }
  }
  public async list(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    try {
      const listReservationsService = new ListReservesService();
      const reserves = await listReservationsService.execute(
        Number(page),
        Number(limit),
      );
      // Retorne as reservas como resposta
      return res.status(200).json(reserves);
    } catch (err) {
      // Trate os erros adequadamente
      console.error('Erro ao listar reservas:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
