import React, { useState, useCallback } from 'react';
import { Alert, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import happyEmojiImg from '@assets/happy.png';

import {
  Wrapper,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton,
} from './styles';

export const Home = () => {
  const { user, signOut } = useAuth();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`) // define limit search
      .get()
      .then(response => {
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProductProps[];

        setPizzas(data);
      })
      .catch(() => {
        Alert.alert('Consulta', 'Não foi possível realizar a consulta');
      });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizzas('');
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';

    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  );

  return (
    <Wrapper>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmojiImg} />
          <GreetingText>Olá, {user?.name}</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search
        onSearch={handleSearch}
        onClear={handleSearchClear}
        onChangeText={setSearch}
        value={search}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>
          {
            pizzas.length === 1
              ? `${pizzas.length} pizza`
              : `${pizzas.length} pizzas`
          }
        </MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {
        user?.isAdmin &&
        <NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={handleAdd}
        />
      }
    </Wrapper>
  );
};
