import axios from 'axios';
import { User } from '@modules/users/infra/mongoose/entities/User';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { validateCPF } from './validators/CpfValidator';
class CreateUserService {
  public async execute(data: ICreateUser): Promise<IUser> {
    const { name, cpf, email, password, birth, cep, qualified } = data;

    // Validar idade
    const age = new Date().getFullYear() - new Date(birth).getFullYear();
    if (age < 18) {
      throw new Error('User must be at least 18 years old');
    }

    if (!validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    // Verificar se o CPF ou email já existem
    const userExists = await User.findOne({ $or: [{ cpf }, { email }] });
    if (userExists) {
      throw new Error('CPF or email already exists');
    }

    // Buscar endereço na API Via CEP
    const viaCepResponse = await axios.get(
      `https://viacep.com.br/ws/${cep}/json`,
    );
    const { street, complement, neighborhood, locality, uf } =
      viaCepResponse.data;

    const user = new User({
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
    });

    await user.save();

    return user.toObject() as IUser;
  }
}

export { CreateUserService };
