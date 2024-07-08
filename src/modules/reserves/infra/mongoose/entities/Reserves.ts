import mongoose, { Schema } from 'mongoose';
import { User } from '@modules/users/infra/mongoose/entities/User';
import { Car } from '@modules/cars/infra/mongoose/entities/Cars';

const ReserveSchema = new mongoose.Schema({
  id_user: { type: Schema.Types.ObjectId, ref: User, required: true },
  id_car: { type: Schema.Types.ObjectId, ref: Car, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  value_per_day: { type: Number, required: true },
  final_value: { type: Number, required: true },
});

const Reserve =
  mongoose.models.Reserve || mongoose.model('Reserve', ReserveSchema);

export default Reserve;
