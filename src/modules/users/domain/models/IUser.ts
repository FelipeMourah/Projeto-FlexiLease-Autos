export interface IUser {
  _id: string;
  name: string;
  birth: Date;
  cpf: string;
  email: string;
  password: string;
  cep: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  qualified: 'sim' | 'não';
}

export interface IAuthenticateUser {
  email: string;
  password: string;
}
