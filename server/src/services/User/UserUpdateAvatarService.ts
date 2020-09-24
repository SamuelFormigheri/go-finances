import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '../../config/upload';
import fs from 'fs';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UserUpdateAvatarService {
    public async execute(obj: IRequest) : Promise<User>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(obj.user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const fileExists = await fs.promises.stat(userAvatarFilePath);

            if(fileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = obj.avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UserUpdateAvatarService;