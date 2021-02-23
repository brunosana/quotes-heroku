import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        if (!email) {
            throw new AppError('Email is missing');
        }
        if (!password) {
            throw new AppError('Password is missing');
        }
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new AppError('Email/Password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email/Password incorrect');
        }

        const token = sign({}, process.env.SECRET, {
            subject: user.id,
            expiresIn: process.env.EXPIRES,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
