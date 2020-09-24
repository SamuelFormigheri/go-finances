import React, {useRef, useCallback} from 'react';
import { FiFileText, FiAlignJustify } from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container } from './styles';

import {useAuth} from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface IFormSubmitContent{
    title: string;
    category: string;
    value: number;
}

const CreateTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);  
  const history = useHistory();
  const auth = useAuth();
  var type = "income";

  const handleSubmit = useCallback(async (data: IFormSubmitContent)=>{
    try{
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é Obrigatório.'),
        category: Yup.string().required('Categoria é Obrigatório.'),
        value: Yup.number().required('Valor é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('transactions',{
        title: data.title,
        value: data.value,
        category: data.category,
        type: type
      },{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });

      history.push('/');
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      const message = {
          id: "message",
          type: "danger",
          title: "Erro na autenticação",
          description: "Verifique os campos e tente novamente..."
      }
    }
  },[history, auth.token, type]);

  return (
      <>
        <Header />
        <Container>
            <div>
                <input name="type" type="radio" value="income" onClick={()=>{type = "income";}} defaultChecked/> <label>Entradas</label>
                <input name="type" type="radio" value="outcome" onClick={()=>{type = "outcome";}}/> <label>Saídas</label>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Cadastro de Transações</h1>
                <Input name="title" icon={FiFileText} placeholder="Título"/>
                <Input name="category" icon={FiAlignJustify} placeholder="Categoria"/>
                <Input name="value" type="number" icon={GiMoneyStack} placeholder="Valor" />
                  
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
      </>
  );
}

export default CreateTransaction;