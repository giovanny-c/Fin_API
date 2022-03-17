import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateStatementError } from './CreateStatementError';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id: receiver_id } = request.params
    const { amount, description } = request.body;

    if (user_id === receiver_id) {
      throw new CreateStatementError.TranferToSameUser
    }
    const splittedPath = request.originalUrl.split('/')

    let type


    type = splittedPath[splittedPath.length - 2] as OperationType;

    if (!receiver_id) {
      type = splittedPath[splittedPath.length - 1] as OperationType;
    }

    console.log(type)

    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute(
      {
        user_id,
        type,
        amount,
        description,
      },
      receiver_id
    );

    return response.status(201).json(statement);
  }
}
