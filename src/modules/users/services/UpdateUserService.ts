import axios from 'axios';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUpdateUser } from '@modules/users/domain/models/IUpdateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { validateCPF } from './validators/CpfValidator';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class UpdateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

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

    // Buscar endereço na API Via CEP
    const viaCepResponse = await axios.get(
      `https://viacep.com.br/ws/${cep}/json`,
    );
    const {
      logradouro: street,
      bairro: neighborhood,
      localidade: locality,
      cidade: city,
      uf,
    } = viaCepResponse.data;

    const updatedUser = await this.userRepository.update(id, {
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      address: {
        street: street || 'N/A',
        neighborhood: neighborhood || 'N/A',
        city: city,
        state: locality,
        uf: uf || 'N/A',
      },
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}

export { UpdateUserService };
