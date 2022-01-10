import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

import { AuthProvider } from '@hooks/auth';

import theme from './theme';
import { Routes } from './routes';

export const App = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  // if (!fontsLoaded) {
  // }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
