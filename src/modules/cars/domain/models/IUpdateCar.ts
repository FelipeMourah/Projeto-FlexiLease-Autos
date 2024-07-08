export interface IUpdateCar {
  model?: string;
  color?: string;
  year?: number;
  value_per_day?: string;
  accessories?: Array<{ id: string; description: string }>;
  number_of_passengers: string;
}
