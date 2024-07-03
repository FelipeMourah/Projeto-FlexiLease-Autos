export interface ICar {
  save(): unknown;
  id: string;
  model: string;
  color: string;
  year: number;
  value_per_day: string;
  accessories: Array<{ id: string; description: string }>;
}
