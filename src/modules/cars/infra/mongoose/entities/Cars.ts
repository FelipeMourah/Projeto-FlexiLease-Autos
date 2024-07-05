import { ICar } from '@modules/cars/domain/models/ICar';
import { Schema, model } from 'mongoose';
const AccessorySchema = new Schema({
  description: { type: String, required: true },
});

const CarSchema = new Schema(
  {
    model: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true, min: 1950, max: 2023 },
    value_per_day: { type: String, required: true },
    accessories: [AccessorySchema],
    number_of_passengers: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Car = model<ICar>('Car', CarSchema);

export { Car };
