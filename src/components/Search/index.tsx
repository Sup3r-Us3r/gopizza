import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Wrapper,
  InputArea,
  Input,
  ButtonClear,
  Button,
} from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export const Search = ({ onSearch, onClear, ...rest }: Props) => {
  const { COLORS } = useTheme();

  return (
    <Wrapper>
      <InputArea>
        <Input placeholder="Pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE} />
      </Button>
    </Wrapper>
  );
};
