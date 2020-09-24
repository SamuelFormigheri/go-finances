import React from 'react';

import Routes from './routes';
import GlobalProvider from './hooks/Global';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  </>
);

export default App;
