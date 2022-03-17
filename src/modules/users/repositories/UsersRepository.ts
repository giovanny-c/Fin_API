import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async changeBalance(user_id: string, balance: number): Promise<void> {
    const user = this.repository.create({ id: user_id, balance })

    this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({
      email,
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return await this.repository.findOne(user_id);
  }

  async create({ name, email, password, id, balance }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password, id, balance });

    return this.repository.save(user);
  }
}
