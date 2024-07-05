import mongoose, { Schema, Model } from 'mongoose';
import { IReserve } from '@modules/reserves/domain/models/IReserve';

const ReserveSchema: Schema = new Schema({
  id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  value_per_day: { type: Number, required: true },
  final_value: { type: Number, required: true },
});

const Reserve: Model<IReserve> = mongoose.model<IReserve>(
  'Reserve',
  ReserveSchema,
);

export { Reserve, IReserve };
