import { getCustomRepository } from "typeorm"

import AppErro from "@shared/erros/AppError"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UserRepository"




interface IResquest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: IResquest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)


    const emailExists = await usersRepository.findByEmail(email)


    if (emailExists) {
      throw new AppErro('Email adress alredy used. XD')
    }

    const user = usersRepository.create({
      name,
      email,
      password
    })

   await usersRepository.save(user);



    return user
  }


  }

export default CreateUserService