import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Quote from '../models/Quote';
import CreateQuoteService from '../services/CreateQuoteService';
import UpdateQuoteService from '../services/UpdateQuoteService';
import DeleteQuoteService from '../services/DeleteQuoteService';
import GetQuoteService from '../services/GetQuoteService';

const quotesRouter = Router();

quotesRouter.get('/', async (request, response) => {
    const quotesRepository = getRepository(Quote);
    const quotes = await quotesRepository.find();
    return response.json(quotes);
});

quotesRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const getQuoteService = new GetQuoteService();
    const { quote, user } = await getQuoteService.execute(id);
    return response.json({ quote, createdBy: user });
});

quotesRouter.use(ensureAuthenticated);

quotesRouter.post('/', async (request, response) => {
    const { author, message } = request.body;

    const createQuoteService = new CreateQuoteService();
    const quote = await createQuoteService.execute({
        author,
        message,
        userId: request.user.id,
    });
    delete quote.user.password;
    return response.json(quote);
});

quotesRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { message, author } = request.body;
    const updateQuoteService = new UpdateQuoteService();
    const quote = await updateQuoteService.execute({
        quoteId: id,
        userId: request.user.id,
        message,
        author,
    });

    return response.json(quote);
});

quotesRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const deleteQuoteService = new DeleteQuoteService();
    await deleteQuoteService.execute({
        quoteId: id,
        userId: request.user.id,
    });

    return response.status(204).send();
});

export default quotesRouter;
