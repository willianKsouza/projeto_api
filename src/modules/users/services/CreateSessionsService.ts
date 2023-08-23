import AppError from '@shared/erros/AppError';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionsService {
   async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);


    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password combination', 401);
    }
    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('incorrect email/password combination', 401);
    }


     const token = sign({}, authConfig.jwt.secret, {
       subject: user.id,
       expiresIn:authConfig.jwt.expiresIn
    })


     return {
       user,
       token
    };
  }
}

export default CreateSessionsService;