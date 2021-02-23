import { validate } from 'uuid';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

class GetUserService {
    public async execute(id: string): Promise<User> {
        if (!id) {
            throw new AppError('Id paramteter required');
        }
        if (!validate(id)) {
            throw new AppError('Invalid id. String must be a uuid');
        }
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }
}

export default GetUserService;
