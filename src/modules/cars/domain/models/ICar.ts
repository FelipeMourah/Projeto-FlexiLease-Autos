export interface IAccessory {
  id: string;
  description: string;
}

export interface ICar {
  id: string;
  save(): unknown;
  model: string;
  color: string;
  year: number;
  value_per_day: string;
  accessories: IAccessory[];
  number_of_passengers: string;
  createdAt?: Date;
  updatedAt?: Date;
}
