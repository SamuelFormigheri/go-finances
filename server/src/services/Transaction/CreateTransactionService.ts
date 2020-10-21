import { getRepository, getCustomRepository } from 'typeorm'

import AppError from '../../errors/AppError';
import Transaction from '../../models/Transaction';
import Category from '../../models/Category';
import User from '../../models/User';
import TransactionsRepository from '../../repositories/TransactionsRepository';

interface IRequest {
  title: string; 
  type: string;
  value: number;
  category: string;
  user_id: string;
}

class CreateTransactionService {
  public async execute(obj: IRequest): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(obj.user_id);

    if(!user){
      throw new AppError('Usuário inválido!', 401);
    }

    var categoryExists = await categoriesRepository.findOne({
      where: {title: obj.category, user_id: obj.user_id}
    });
   
    if(!categoryExists)
    {
      const categoryInserted = categoriesRepository.create({
        title: obj.category,
        user_id: user.id,
        user: user
      });
      await categoriesRepository.save(categoryInserted);
    }

    var category = await categoriesRepository.findOne({
      where: {title: obj.category, user_id: obj.user_id}
    });

    if(!category){
      throw new AppError("Unable to create category, please check the name and try again.");
    }
    
    const balance = await transactionsRepository.getBalance(obj.user_id);

    if(obj.type === "outcome" && obj.value > balance.total)
      throw new AppError("You don't have a valid balance.");

    const transaction = transactionsRepository.create({
      title: obj.title,
      value: obj.value,
      category_id: category.id,
      category: category,
      type: obj.type === "income" ? 'income' : 'outcome',
      user_id: obj.user_id,
      user: user
    });
        
     await transactionsRepository.save(transaction);

     return transaction;
  }
}

export default CreateTransactionService;
