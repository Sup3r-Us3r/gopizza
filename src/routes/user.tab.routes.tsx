import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';

import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomMenu } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export const UserTabRoutes = () => {
  const [notifications, setNotifications] = useState<string>('0');

  const { COLORS } = useTheme();

  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', 'Entregue')
      .onSnapshot(querySnapshot => {
        setNotifications(String(querySnapshot.docs.length));
      })

    return () => subscriber();
  }, []);

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          )
        }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title="Pedidos"
              color={color}
              notifications={notifications}
            />
          )
        }}
      />
    </Navigator>
  );
}
