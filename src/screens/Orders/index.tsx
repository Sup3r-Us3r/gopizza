import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { OrderCard, OrderProps } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';

import {
  Wrapper,
  Header,
  Title,
} from './styles';

export const Orders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handlePizzaDelivered(orderId: string) {
    Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore()
            .collection('orders')
            .doc(orderId)
            .update({
              status: 'Entregue'
            })
            .then(() => true)
            .catch(() => {
              Alert.alert('Pedido', 'Não foi possível atualizar o status do pedido');
            })
        }
      }
    ]);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as OrderProps[];

        setOrders(data);
      });

    return () => subscriber();
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 125,
        }}
      />
    </Wrapper>
  );
};
