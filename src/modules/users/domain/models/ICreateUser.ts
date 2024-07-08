export interface ICreateUser {
  name: string;
  birth: Date;
  cpf: string;
  email: string;
  password: string;
  cep: string;
  qualified: 'sim' | 'não';
}
