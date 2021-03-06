import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"

import { CreateStatementUseCase } from "./CreateStatementUseCase"

import { OperationType } from "../../entities/Statement"



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

        const id = createdUser.id as string

        const balance = await createStatementUseCase.execute({ user_id: id, type: "deposit" as OperationType, amount: 100, description: "test" })

        expect(balance).toHaveProperty("id")
        expect(balance.amount).toEqual(100)
        expect(balance.type).toEqual("deposit")


    })

    it("Should create a withdraw statement for a user", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const createdUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        const id = createdUser.id as string

        await createStatementUseCase.execute({ user_id: id, type: "deposit" as OperationType, amount: 100, description: "test" })

        const balance = await createStatementUseCase.execute({ user_id: id, type: "withdraw" as OperationType, amount: 50, description: "test" })

        expect(balance).toHaveProperty("id")
        expect(balance.amount).toEqual(50)
        expect(balance.type).toEqual("withdraw")


    })



})