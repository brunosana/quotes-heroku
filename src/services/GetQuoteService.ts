import { getRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import Quote from '../models/Quote';
import User from '../models/User';

interface Response {
    quote: Quote;
    user: User | string;
}

class GetQuoteService {
    public async execute(id: string): Promise<Response> {
        if (!id) {
            throw new AppError('Quote id parameter required');
        }
        if (!validate(id)) {
            throw new AppError('Invalid quote id');
        }

        const quotesRepository = getRepository(Quote);
        const quote = await quotesRepository.findOne({
            where: {
                id,
            },
        });
        if (!quote) {
            throw new AppError('Quote not found', 404);
        }
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            where: {
                id: quote.createdBy,
            },
        });
        if (user) {
            return { quote, user };
        }
        return {
            quote,
            user: 'The user that created this quote has not found',
        };
    }
}

export default GetQuoteService;
