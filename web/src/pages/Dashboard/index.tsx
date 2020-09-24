import React, { useState, useEffect, useCallback } from 'react';
import {FiTrash2} from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';

import {useAuth} from '../../hooks/AuthContext';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const auth = useAuth();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const [response] = await Promise.all([
        api.get('transactions',{
          headers:{
            Authorization: `Bearer ${auth.token}`
          }
        })
      ]);

      const transactionsFormatted = response.data.transactions.map((transaction :Transaction) => ({
        ...transaction, 
        formattedValue: formatValue(transaction.value), 
        formattedDate: new Date(transaction.created_at).toLocaleDateString('pt-br')
      })
      );

      const balanceFormatted = {
        income: formatValue(response.data.balance.income), 
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total)
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }
    loadTransactions();
  }, [auth.token]);

  const handleDelete = useCallback((transaction :Transaction) => {
    api.delete(`transactions/${transaction.id}`,{
      headers:{
        Authorization: `Bearer ${auth.token}`
      }
    }).then((response)=>{
      const updatedTransactions = transactions.filter((transact) => transact.id !== transaction.id);
      const updatedBalance :Balance = {
        income: formatValue(response.data.income),
        outcome: formatValue(response.data.outcome),
        total: formatValue(response.data.total)
      };
      setTransactions(updatedTransactions);
      setBalance(updatedBalance);
    });
  },[auth.token, transactions]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance ? balance.income : "Carregando..."}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance ? balance.outcome : "Carregando..."}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance ? balance.total : "Carregando..."}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            {transactions ? (
              <tbody>
                {transactions.map(transaction => {
                    return(
                      <tr key={transaction.id}>
                        <td className="title">{transaction.title}</td>
                        <td className={transaction.type}>{transaction.type === 'outcome' && ' - '} {transaction.formattedValue}</td>
                        <td>{transaction.category.title}</td>
                        <td>{transaction.formattedDate}</td>
                        <td><FiTrash2 onClick={() => {handleDelete(transaction)}}/></td>
                      </tr>
                    );
                })}
              </tbody>
            ): <p> Carregando...</p>}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
