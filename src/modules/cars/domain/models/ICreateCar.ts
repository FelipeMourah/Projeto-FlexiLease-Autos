export interface ICreateCar {
  model: string;
  color: string;
  year: number;
  value_per_day: string;
  accessories: Array<{ description: string }>;
}
