import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

@injectable()
export class CreateStatementUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) { }

  async execute({ user_id, type, amount, description }: ICreateStatementDTO, receiver_id: string) {

    let user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateStatementError.UserNotFound();
    }


    if (type === 'withdraw' || (type === 'transfer')) {
      const { balance } = await this.statementsRepository.getUserBalance({ user_id });
      console.log(balance)
      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }
    }
    //se user.id === a sender.id ele mandou a tranfer ou seja balance --
    if (type === 'transfer') {

      const senderStatementOperation = await this.statementsRepository.create({
        user_id,
        sender_id: user_id,
        type,
        amount,
        description
      })

      const receiverStatementOperation = await this.statementsRepository.create({
        user_id: receiver_id,
        sender_id: user_id,
        type,
        amount,
        description
      })

      return receiverStatementOperation
    }


    //criar dois statements de transfer um para o sender e outro para o receiver
    const statementOperation = await this.statementsRepository.create({
      user_id,
      type,
      amount,
      description
    });

    return statementOperation;
  }
}
