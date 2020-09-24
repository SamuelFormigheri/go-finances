import { Router } from 'express';

import usersRouter from './User/users.routes';
import sessionsRouter from './Session/sessions.routes';
import transactionsRouter from './Transaction/transactions.routes';

const routes = Router();

// Exemplos
routes.use('/transactions', transactionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;