import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';
import uploadConfig from '@config/upload';
import path from 'path';
import  fs  from 'fs';

interface IRequest {
  user_id: string;
  avatarFileName: string;

}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User not found");
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await usersRepository.save(user)

    return user


  }
}

export default UpdateUserAvatarService;


// {
// 	"name": "chapolin colorado",
// 	"email": "chapolin@gmail.com",
// 	"password": "123456"
// }