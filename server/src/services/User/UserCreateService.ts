import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class UserCreateService {
    public async execute(obj : IRequest) : Promise<User>  {
        const userRepository = getRepository(User);

        const checkUserExistance = await userRepository.findOne({
            where: { email: obj.email }
        });

        if (checkUserExistance){
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(obj.password, 8);

        const user = userRepository.create({
            name: obj.name,
            email: obj.email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
}

export default UserCreateService