import { EntityRepository, Repository, getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import User from '../models/User';

import AppError from '../errors/AppError';

interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

interface CategoryDTO {
  id: string;
  title: string;
}

interface CreateTransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: CategoryDTO;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(user_id :string): Promise<IBalance> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if(!user){
      throw new AppError('Usuário inválido!', 401);
    }

    const transactions = await this.find({user_id: user_id});

    const balance: IBalance = {
      income: 0,
      outcome: 0,
      total: 0
    };

    if(transactions.length > 0){
      transactions.map(transaction => {
        if(transaction.type === "income"){
          balance.income += Number(transaction.value);
          balance.total  += Number(transaction.value);
        }
        else{
          balance.outcome += Number(transaction.value);
          balance.total -= Number(transaction.value);
        }
      });
    }

    return balance;
  }
  public async getTransactions(user_id :string): Promise<CreateTransactionDTO[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if(!user){
      throw new AppError('Usuário inválido!', 401);
    }

    const transactions = transactionsRepository.find({
      where: {user_id: user_id},
      relations: ["category"]
    });
    return transactions;
  }
}

export default TransactionsRepository;
