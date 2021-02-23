import { getRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import Quote from '../models/Quote';

interface Request {
    userId: string;
    quoteId: string;
}

class DeleteQuoteService {
    public async execute({ userId, quoteId }: Request): Promise<void> {
        if (!userId) {
            throw new AppError('User id parameter required');
        }
        if (!quoteId) {
            throw new AppError('Quote id parameter required');
        }

        if (!validate(userId)) {
            throw new AppError('Invalid user id');
        }

        if (!validate(quoteId)) {
            throw new AppError('Invalid quote id');
        }

        const quotesRepository = getRepository(Quote);

        const quote = await quotesRepository.findOne({
            where: {
                id: quoteId,
            },
        });
        if (!quote) {
            throw new AppError('Quote not found', 404);
        }

        await quotesRepository.remove(quote);
    }
}

export default DeleteQuoteService;
