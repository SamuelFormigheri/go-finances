import React from 'react';

import {AuthProvider} from './AuthContext';

const GlobalProvider: React.FC = ({children}) => {
  return (
    <AuthProvider>
            {children}
    </AuthProvider>
  );
}

export default GlobalProvider;