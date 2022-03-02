
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository

let authenticateUserUseCase: AuthenticateUserUseCase

let createUserUseCase: CreateUserUseCase

describe("Authentication of a user", () => {


    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })


    it("Should be able to authenticate a user", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        const createdUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        const authentication = await authenticateUserUseCase.execute({ email: user.email, password: user.password })


        expect(authentication).toHaveProperty("token")
        expect(authentication.user.id).toEqual(createdUser.id)
    })

})