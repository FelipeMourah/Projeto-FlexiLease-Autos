interface IReserve {
  id: string;
  id_user: string;
  id_car: string;
  start_date: Date;
  end_date: Date;
  value_per_day: number;
  final_value: number;
}

export { IReserve };
