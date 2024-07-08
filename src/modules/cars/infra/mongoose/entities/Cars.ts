// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { Schema, Document, model } from 'mongoose';
import { ICar } from '@modules/cars/domain/models/ICar';

const AccessorySchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
});

const CarSchema = new Schema(
  {
    model: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true, min: 1950, max: 2025 },
    value_per_day: { type: String, required: true },
    accessories: [AccessorySchema],
    number_of_passengers: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Car = model<ICar & Document>('Car', CarSchema);

export { Car };
