import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';

export interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<User>;
  changeBalance(user_id: string, balance: number): Promise<void>
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (user_id: string) => Promise<User | undefined>;
}
