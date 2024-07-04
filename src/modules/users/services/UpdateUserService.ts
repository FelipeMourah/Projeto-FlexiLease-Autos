// services/UpdateUserService.ts
import axios from 'axios';
import { User } from '@modules/users/infra/mongoose/entities/User';
import { IUpdateUser } from '@modules/users/domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import { validateCPF } from './validators/CpfValidator';
import { ObjectId } from 'mongoose';

class UpdateUserService {
  public async execute(id: string, data: IUpdateUser): Promise<IUser | null> {
    const { name, cpf, email, password, birth, cep, qualified } = data;

    // Validar idade
    if (birth) {
      const age = new Date().getFullYear() - new Date(birth).getFullYear();
      if (age < 18) {
        throw new Error('User must be at least 18 years old');
      }
    }

    // Verificar se o CPF é válido
    if (cpf && !validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    // Verificar se o CPF ou email já existem
    const userExists = await User.findOne({ $or: [{ cpf }, { email }] });
    if (userExists && (userExists._id as ObjectId).toString() !== id) {
      throw new Error('CPF or email already exists');
    }

    // Buscar endereço na API Via CEP
    const viaCepResponse = await axios.get(
      `https://viacep.com.br/ws/${cep}/json`,
    );
    const { street, complement, neighborhood, locality, uf } =
      viaCepResponse.data;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        cpf,
        birth,
        email,
        password,
        cep,
        qualified,
        address: {
          street: street || 'N/A',
          complement: complement || 'N/A',
          neighborhood: neighborhood || 'N/A',
          locality: locality || 'N/A',
          uf: uf || 'N/A',
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser.toObject() as IUser;
  }
}

export { UpdateUserService };
