import { getRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import User from '../models/User';

class deleteUserService {
    public async execute(id: string): Promise<void> {
        if (!id) {
            throw new AppError('Id parameter requider');
        }
        if (!validate(id)) {
            throw new AppError('Invalid id. String must be a uuid');
        }
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        await usersRepository.remove(user);
    }
}

export default deleteUserService;
