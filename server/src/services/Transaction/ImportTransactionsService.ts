import csvParse from 'csv-parse';
import { getRepository, getCustomRepository, In } from 'typeorm'
import TransactionsRepository from '../../repositories/TransactionsRepository';

import Category from '../../models/Category';
import User from '../../models/User';

import AppError from '../../errors/AppError';

import fs from 'fs';

interface IRequest {
  csvFilePath: string;
  user_id: string;
}

interface ITransaction{
  title:string;
  type: string; 
  value: number;
  category: string;
  user_id: string;
}

interface IResponse{
  categories: string[];
  transactions: ITransaction[];
}
class ImportTransactionsService {
  async execute(obj: IRequest): Promise<IResponse> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(obj.user_id);

    if(!user){
      throw new AppError('Usuário inválido!', 401);
    }

    const fileExists = await fs.createReadStream(obj.csvFilePath);

    const parseCsv = csvParse({
      from_line: 2
    });

    const parsedCsv = fileExists.pipe(parseCsv);

    const transactions: ITransaction[] = [];
    const categories: string[] = [];

    parsedCsv.on('data', async line => {
      const [title, type, value, category] = line.map( (cell:string) => cell.trim());

      if(!title || !type || !value || !category){
        return;
      }

      categories.push(category);
      transactions.push({ title, type, value, category, user_id: obj.user_id });

    });
   
    await new Promise(resolve => parsedCsv.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where:{
        title: In(categories)
      }
    });

    const existentCategoriesTitles = existentCategories.map(category => category.title);  

    const addCategoryTitles = categories.filter(category => !existentCategoriesTitles.includes(category))
      .filter((value,index,self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title =>({
        title
      }))
    );
    await categoriesRepository.save(newCategories);

    const allCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
      title: transaction.title,
      type: transaction.type == "income" ? 'income' : 'outcome',
      value: transaction.value,
      category: allCategories.find(category => category.title === transaction.category),
      user_id: transaction.user_id,
      user: user
    })));
    
    await transactionsRepository.save(createdTransactions);

    await fs.promises.unlink(obj.csvFilePath);

    return {categories, transactions};
  }
}

export default ImportTransactionsService;
