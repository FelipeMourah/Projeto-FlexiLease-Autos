import { IUser } from '@modules/users/domain/models/IUser';
import { Document, model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, requir7ed: true, unique: true },
  password: { type: String, required: true },
  birth: { type: Date, required: true },
  cep: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  qualified: { type: Boolean, required: true },
});

export const User = model<IUser & Document>('User', UserSchema);
