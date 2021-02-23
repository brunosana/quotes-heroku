import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import quotesRouter from './quotes.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/quotes', quotesRouter);

export default routes;
