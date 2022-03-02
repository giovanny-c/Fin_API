import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"

import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase"

import { OperationType } from "../../entities/Statement"
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"



let inMemoryStatementsRepository: InMemoryStatementsRepository

let inMemoryUsersRepository: InMemoryUsersRepository

let createStatementUseCase: CreateStatementUseCase

let createUserUseCase: CreateUserUseCase

let getStatementOperationUseCase: GetStatementOperationUseCase




describe("Create a deposit or withdraw statement", () => {

    beforeEach(() => {

        inMemoryStatementsRepository = new InMemoryStatementsRepository()
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
        getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)

    })

    it("Should create a deposit statement for a user", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const createdUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        const user_id = createdUser.id as string

        const statement = await createStatementUseCase.execute({ user_id, type: "deposit" as OperationType, amount: 100, description: "test" })

        const operation_id = statement.id as string

        const operation = await getStatementOperationUseCase.execute({ user_id: statement.user_id, statement_id: operation_id })

        expect(operation).toHaveProperty("id")
        expect(operation.type).toEqual("deposit")


    })




})