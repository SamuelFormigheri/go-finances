import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

class UserAuthenticateService {
    public async execute(obj: IRequest): Promise<IResponse>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {email: obj.email}
        });

        if(!user){
            throw new AppError('Email/Password incorrect.', 401);
        }

        const passwordMatched = await compare(obj.password, user.password);
        
        if(!passwordMatched){
            throw new AppError('Email/Password incorrect.', 401);
        }

        const token = sign({},  authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {user, token};

    }
}

export default UserAuthenticateService;