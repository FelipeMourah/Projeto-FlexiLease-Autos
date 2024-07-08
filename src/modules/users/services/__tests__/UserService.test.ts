import { CreateUserService } from '../CreateUserService';
import { DeleteUserService } from '../DeleteUserService';
import { ListUserService } from '../ListUserService';
import { ShowUserService } from '../ShowUserService';
import { UpdateUserService } from '../UpdateUserService';
import { FakeUserRepository } from '../../infra/mongoose/repositories/fakeuserRepository'; // Verifique o caminho correto
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

describe('UserService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userRepository: FakeUserRepository;
  let createUserService: CreateUserService;
  let deleteUserService: DeleteUserService;
  let listUserService: ListUserService;
  let showUserService: ShowUserService;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    userRepository = new FakeUserRepository();
    createUserService = new CreateUserService();
    deleteUserService = new DeleteUserService();
    listUserService = new ListUserService();
    showUserService = new ShowUserService();
    updateUserService = new UpdateUserService();
  });

  it('should create a new user', async () => {
    const userData: ICreateUser = {
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john.doe@example.com',
      password: 'password123',
      birth: new Date('1990-01-01'),
      cep: '12345-678',
      qualified: 'não',
    };

    const createdUser = await createUserService.execute(userData);

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.cpf).toBe(userData.cpf);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.birth).toBe(userData.birth);
    expect(createdUser.qualified).toBe(userData.qualified);
  });

  it('should list all users', async () => {
    const users = await listUserService.execute();

    expect(users).toHaveLength(0); // Inicialmente, nenhum usuário está cadastrado

    const userData: ICreateUser = {
      name: 'Jane Doe',
      cpf: '98765432109',
      email: 'jane.doe@example.com',
      password: 'password456',
      birth: new Date('2000-05-04'),
      cep: '54321-987',
      qualified: 'sim',
    };

    await createUserService.execute(userData); // Cria um novo usuário

    const updatedUsers = await listUserService.execute();

    expect(updatedUsers).toHaveLength(1); // Agora deve haver um usuário na lista
  });

  it('should show a user by ID', async () => {
    const userData: ICreateUser = {
      name: 'Jane Doe',
      cpf: '98765432109',
      email: 'jane.doe@example.com',
      password: 'password456',
      birth: new Date('1990-11-21'),
      cep: '54321-987',
      qualified: 'sim',
    };

    const createdUser = await createUserService.execute(userData);

    const foundUser = await showUserService.execute(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser!.id).toBe(createdUser.id);
    expect(foundUser!.name).toBe(userData.name);
    expect(foundUser!.cpf).toBe(userData.cpf);
  });

  it('should update a user', async () => {
    const userData: ICreateUser = {
      name: 'Jane Doe',
      cpf: '98765432109',
      email: 'jane.doe@example.com',
      password: 'password456',
      birth: new Date('1990-03-31'),
      cep: '54321-987',
      qualified: 'sim',
    };

    const createdUser = await createUserService.execute(userData);

    const updateData = {
      name: 'Jane Smith',
      cpf: '98765432109',
      email: 'jane.smith@example.com',
      birth: new Date('1990-10-10'),
      cep: '11111-222',
      qualified: 'não',
    };

    const updatedUser = await updateUserService.execute(
      createdUser.id,
      updateData,
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser!.id).toBe(createdUser.id);
    expect(updatedUser!.name).toBe(updateData.name);
    expect(updatedUser!.email).toBe(updateData.email);
    expect(updatedUser!.birth).toEqual(updateData.birth);
    expect(updatedUser!.qualified).toBe(updateData.qualified);
  });

  it('should delete a user', async () => {
    const userData: ICreateUser = {
      name: 'Jane Doe',
      cpf: '98765432109',
      email: 'jane.doe@example.com',
      password: 'password456',
      birth: new Date('1990-06-08'),
      cep: '54321-987',
      qualified: 'não',
    };

    const createdUser = await createUserService.execute(userData);

    deleteUserService.execute(createdUser.id);

    const foundUser = await showUserService.execute(createdUser.id);

    expect(foundUser).toBeNull(); // Depois de deletar, o usuário não deve ser encontrado
  });
});
