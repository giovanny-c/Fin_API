
import { CreateUserError } from "./CreateUserError"

import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"

import { CreateUserUseCase } from "./CreateUserUseCase"


let inMemoryUsersRepository: InMemoryUsersRepository

let createUserUseCase: CreateUserUseCase

describe("Create a user", () => {

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it("should be able to create a new user", async () => {


        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const result = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        expect(result).toHaveProperty("id")

    })

})