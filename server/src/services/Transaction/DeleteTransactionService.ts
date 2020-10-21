import { getCustomRepository, getRepository } from 'typeorm'
import AppError from '../../errors/AppError';
import TransactionsRepository from '../../repositories/TransactionsRepository';
import User from '../../models/User';
interface IRequest{
  id: string;
  user_id: string;
}

class DeleteTransactionService {
  public async execute({id, user_id} :IRequest): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if(!user){
      throw new AppError('Usuário inválido!', 401);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionExists = await transactionsRepository.findOne({
      where: {id: id, user_id: user_id}
    });

    if(!transactionExists){
      throw new AppError("You cannot delete an inexistant transition or you don't have access");
    }

    await transactionsRepository.remove(transactionExists);

    return;
  }
}

export default DeleteTransactionService;
