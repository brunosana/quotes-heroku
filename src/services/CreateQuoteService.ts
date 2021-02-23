import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Quote from '../models/Quote';
import User from '../models/User';

interface Request {
    userId: string;
    message: string;
    author: string;
}

class CreateQuoteService {
    public async execute({ userId, message, author }: Request): Promise<Quote> {
        if (!userId) {
            throw new AppError('User id parameter required');
        }
        if (!message) {
            throw new AppError('Message is missing');
        }
        if (!author) {
            throw new AppError('Author is missing');
        }

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new AppError('User not found, please, try again');
        }

        const quotesRepository = getRepository(Quote);

        const quote = quotesRepository.create({
            message,
            author,
            user,
        });

        const response = await quotesRepository.save(quote);

        return response;
    }
}

export default CreateQuoteService;
