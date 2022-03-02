import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository

let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show a profile of an user", () => {


    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
    })


    it("Shold be able show a profile of a providen user", async () => {

        const user = {
            name: "tester",
            email: "test@test.com",
            password: "test123"
        }

        await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password })

        const authentication = await authenticateUserUseCase.execute({ email: user.email, password: user.password })



        if (authentication.user.id != undefined) {
            const profile = await showUserProfileUseCase.execute(authentication.user.id)


            expect(profile).toHaveProperty("id")
            expect(profile.email).toEqual(user.email)
        }

    })

})