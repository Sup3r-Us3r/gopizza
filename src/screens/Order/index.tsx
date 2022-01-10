import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { OrderNavigationProps } from '@src/@types/navigation';
import { ProductProps } from '@components/ProductCard';

import {
  Wrapper,
  Content,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
} from './styles';

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
};

export const Order = () => {
  const { user } = useAuth();

  const [size, setSize] = useState<string>('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState<number>(0);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [sendingOrder, setSendingOrder] = useState<boolean>(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size ? pizza?.prices_sizes[size] * quantity : '0,00';

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert('Pedido', 'Selecione o tamanho da pizza');
    }

    if (!tableNumber) {
      return Alert.alert('Pedido', 'Informe o número da mesa');
    }

    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade');
    }

    setSendingOrder(true);

    firestore()
      .collection('orders')
      .add({
        pizza: pizza?.name,
        size,
        image: pizza?.photo_url,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        quantity,
        amount,
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        setSendingOrder(false);

        Alert.alert('Pedido', 'Não foi possível realizar o pedido');
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => {
          Alert.alert('Pedido', 'Não foi possível carregar o produto');
        });
    }
  }, [id]);

  return (
    <Wrapper>
      <Content behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header>
          <ButtonBack
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Photo source={{ uri: pizza?.photo_url }} />

        <Form>
          <Title>{pizza?.name}</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>
            {PIZZA_TYPES.map(item => (
              <RadioButton
                key={item.id}
                title={item.name}
                selected={size === item.id}
                onPress={() => setSize(item.id)}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
                onChangeText={setTableNumber}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={value => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </Form>
      </Content>
    </Wrapper>
  );
};
