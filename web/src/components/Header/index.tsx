import React from 'react';
import { Link } from 'react-router-dom';

import { Container, LogOutIcon } from './styles';
import Logo from '~/assets/logo.svg';
import {useAuth} from '~/hooks/AuthContext';

interface HeaderProps {
  size?: 'small' | 'large';
  toggleModalCreateTransaction?: () => void;
}

const Header: React.FC<HeaderProps> = ({ size = 'large', toggleModalCreateTransaction }: HeaderProps) => {
  const auth = useAuth();
  return(
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {
          <>
            <Link to="/">Listagem</Link>
            {toggleModalCreateTransaction && (<button type="button" onClick={toggleModalCreateTransaction}>Cadastrar</button>)}
            <Link to="/import">Importar</Link>
            <LogOutIcon onClick={auth.signOut}/>
          </>
        }
      </nav>
    </header>
  </Container>
)};

export default Header;
