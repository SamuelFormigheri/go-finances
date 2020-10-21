import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import multer from 'multer';
import uploadConfig from '../../config/upload';

import verifyAuthenticated from '../../middlewares/verifyAuthenticated';

import TransactionsRepository from '../../repositories/TransactionsRepository';
import CreateTransactionService from '../../services/Transaction/CreateTransactionService';
import DeleteTransactionService from '../../services/Transaction/DeleteTransactionService';
import ImportTransactionsService from '../../services/Transaction/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', verifyAuthenticated, async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.getTransactions(request.user.id);
  const balance = await transactionsRepository.getBalance(request.user.id);
  return response.json({ transactions, balance});
});

transactionsRouter.post('/', verifyAuthenticated, async (request, response) => {
    const { title, type, value, category } = request.body;
    const createTransaction = new CreateTransactionService();
    const transaction = await createTransaction.execute({title: title, type: type, value: value, category: category, user_id: request.user.id})
    return response.json(transaction); 
});

transactionsRouter.delete('/:id', verifyAuthenticated, async (request, response) => {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const { id } = request.params;
    const deleteTransaction = new DeleteTransactionService();
    await deleteTransaction.execute({id: id, user_id: request.user.id});
    const balance = await transactionsRepository.getBalance(request.user.id);
    return response.status(200).json(balance);
});

transactionsRouter.post('/import', verifyAuthenticated, upload.single('file'),async (request, response) => {
  const importTransaction = new ImportTransactionsService();

  const transaction = await importTransaction.execute({csvFilePath: request.file.path, user_id: request.user.id});

  return response.status(200).json(transaction);
});

export default transactionsRouter;
