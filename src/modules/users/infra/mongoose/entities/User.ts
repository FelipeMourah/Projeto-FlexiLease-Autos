import { IUser } from '@modules/users/domain/models/IUser';
import mongoose, { Document, model } from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, requir7ed: true, unique: true },
  password: { type: String, required: true },
  birth: { type: Date, required: true },
  cep: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String },
    state: { type: String, required: true },
  },
  qualified: { type: String, required: true, require: false },
});

export const User = model<IUser & Document>('User', UserSchema);
