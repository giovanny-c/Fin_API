import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"

import { CreateStatementUseCase } from "./CreateStatementUseCase"

let inMemoryStatementsRepository: InMemoryStatementsRepository

let inMemoryUsersRepository: InMemoryUsersRepository

let createStatementUseCase: CreateStatementUseCase

let createUserUseCase: CreateUserUseCase



describe("Create a deposit or withdraw statement", () => {

    beforeEach(() => {

        inMemoryStatementsRepository = new InMemoryStatementsRepository()
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

    })

    it("Should create a deposit statement for a user", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const createdUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        const statement = {
            user_id: createdUser.id,
            type: ,
            amount: 100,
            description: "test"
        }

        if (statement.user_id != undefined) {
            const balance = await createStatementUseCase.execute({ user_id: statement.user_id, type: statement.type, amount: statement.amount, description: statement.description })

            expect(balance).toHaveProperty("statement")
            expect(balance).toHaveProperty("balance")
            expect(balance.balance).toEqual(0)
        }
    })

})