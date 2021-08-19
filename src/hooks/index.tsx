import React from 'react';

import { AuthProvider } from './auth';
import { FirstAccessProvider } from './access';

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider><FirstAccessProvider>{children}</FirstAccessProvider></AuthProvider>
);

export default AppProvider;
