import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birth: Date;
  cep: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  qualified: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
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

export const User = model<IUser>('User', UserSchema);
