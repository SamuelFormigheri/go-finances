import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface ICredentialsData{
    token: string;
    user: object;
}

interface ICredentials {
    email: string;
    password: string;   
}

interface IAuthContext {
    token: string;
    user: object;
    signIn(credentials:ICredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider: React.FC = ({children}) => {

    const getCredentialsFromLocalStorage = useCallback(()=>{
      const token = localStorage.getItem('@GoFinances:token');
      const user = localStorage.getItem('@GoFinances:user');
  
      if(token && user)
          return { token, user:JSON.parse(user)}
  
      return {} as ICredentialsData;
    },[]);

  const [credentialsData, setCredentialsData] = useState<ICredentialsData>(getCredentialsFromLocalStorage);


  const signIn = useCallback(async({email, password}) => {
      const response = await api.post('sessions',{
          email: email,
          password: password
      });
      const { token, user } = response.data;

      localStorage.setItem('@GoFinances:token', token);
      localStorage.setItem('@GoFinances:user', JSON.stringify(user));

      setCredentialsData({token: token, user: user});
  },[]);

  const signOut = useCallback(() => {
    
    localStorage.removeItem('@GoFinances:token');
    localStorage.removeItem('@GoFinances:user');

    setCredentialsData({} as ICredentialsData);
},[]);

  return (
    <AuthContext.Provider value={{token: credentialsData.token, user: credentialsData.user, signIn, signOut}}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth must be used within an Auth Provider');
    }

    return context;
}
