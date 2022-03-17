import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    await createUser.execute({
      name,
      email,
      password
    });

    return response.status(201).send();
  }
}
