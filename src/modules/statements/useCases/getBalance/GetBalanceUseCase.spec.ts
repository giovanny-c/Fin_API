import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"

import { GetBalanceUseCase } from "./GetBalanceUseCase"

let inMemoryStatementsRepository: InMemoryStatementsRepository

let inMemoryUsersRepository: InMemoryUsersRepository

let getBalanceUseCase: GetBalanceUseCase

let createUserUseCase: CreateUserUseCase



describe("Get a users balance", () => {

    beforeEach(() => {

        inMemoryStatementsRepository = new InMemoryStatementsRepository()
        inMemoryUsersRepository = new InMemoryUsersRepository()
        getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

    })

    it("Should return a users balance with its given id", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const createdUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        if (createdUser.id != undefined) {
            const balance = await getBalanceUseCase.execute({ user_id: createdUser.id })

            expect(balance).toHaveProperty("statement")
            expect(balance).toHaveProperty("balance")
            expect(balance.balance).toEqual(0)
        }
    })

})