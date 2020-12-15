import React from 'react';

import { useAuth } from '../../hooks/auth';
import DrawerUser from '../../componentes/DrawerUser';
import DrawerMedic from '../../componentes/DrawerMedic';

const Dashboard: React.FC = () => {
  const { medic } = useAuth();
  return (
      // <View style={{ flex: 1, justifyContent: 'center'}}>
    medic ?  <DrawerMedic /> : <DrawerUser /> 
  );
};

export default Dashboard;
