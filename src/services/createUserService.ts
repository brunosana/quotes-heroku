import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    username: string;
    email: string;
    password: string;
}

class createUserService {
    public async execute({
        username,
        email,
        password,
    }: Request): Promise<User> {
        if (!username) {
            throw new AppError('Username paramteter required');
        }
        if (!email) {
            throw new AppError('Email paramteter required');
        }
        if (!password) {
            throw new AppError('Password paramteter required');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email,
            },
        });
        if (userExists) {
            throw new AppError('Email alredy used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        const response = await usersRepository.save(user);

        return response;
    }
}

export default createUserService;
