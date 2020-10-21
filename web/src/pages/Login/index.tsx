import React, {useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';


import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ISignIn{
   email: string;
   password: string; 
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const {signIn} = useAuth();

    const handleSubmit = useCallback(async (data: ISignIn) :Promise<void> => {
        try
        {
          formRef.current?.setErrors({});
  
          const schema = Yup.object().shape({
              email: Yup.string().required('E-mail é Obrigatório.').email('E-mail Invalido.'),
              password: Yup.string().required('Senha é Obrigatório.')
          });
  
          await schema.validate(data, {
              abortEarly: false
          });
          await signIn({
              email: data.email,
              password: data.password
          });
          history.push('/');
        }
        catch(err)
        {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
            // const message = {
            //     id: "message",
            //     type: "danger",
            //     title: "Erro na autenticação",
            //     description: "Verifique os campos e tente novamente..."
            // }
        }
    },[signIn, history]);


  return (
      <Container>
          <Content>
              <AnimationContainer>
              <img src={logo} alt="GoBarber Logo"/>

              <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Faça seu Logon</h1>
                  <Input name="email" icon={FiMail} placeholder="E-mail"/>
                  <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>
                  
                  <Button type="submit">Entrar</Button>

                  <Link to="/forgot">Esqueci minha senha</Link>
              </Form>
              <Link to="/register"><FiLogIn /> Criar conta</Link>
              </AnimationContainer>
          </Content>
          <Background />
      </Container>
  );
}

export default Login;