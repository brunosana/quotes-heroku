import { getRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import Quote from '../models/Quote';

interface Request {
    message?: string;
    author?: string;
    userId: string;
    quoteId: string;
}

class UpdateQuoteService {
    public async execute({
        message,
        author,
        userId,
        quoteId,
    }: Request): Promise<Quote> {
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
            throw new AppError('Quote not found');
        }
        if (quote.createdBy !== userId) {
            throw new AppError('Quote is not created by user request');
        }
        if (message) {
            quote.message = message;
        }
        if (author) {
            quote.author = author;
        }
        const response = await quotesRepository.save(quote);

        return response;
    }
}

export default UpdateQuoteService;
