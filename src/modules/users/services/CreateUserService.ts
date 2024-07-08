import axios from 'axios';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { validateCPF } from './validators/CpfValidator';
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository';

class CreateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

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
    const userExists =
      (await this.userRepository.findByEmail(email)) ||
      (await this.userRepository.findByCpf(cpf));
    if (userExists) {
      throw new Error('CPF or email already exists');
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

    const user = await this.userRepository.create({
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
      _id: '',
      id: '',
    });

    return user;
  }
}

export { CreateUserService };
