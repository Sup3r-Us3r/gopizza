import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';

import { SignIn } from '@screens/SignIn';
import { UserStackRoutes } from './user.stack.routes';
import { UserTabRoutes } from './user.tab.routes';


export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user ? <UserStackRoutes /> : <SignIn /> }
    </NavigationContainer>
  );
}
