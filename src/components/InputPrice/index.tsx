import React from 'react';
import { TextInputProps } from 'react-native';

type Props = TextInputProps & {
  size: string;
}

import {
  Wrapper,
  Size,
  Label,
  Input,
} from './styles';

export const InputPrice = ({ size, ...rest }: Props) => {
  return (
    <Wrapper>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Wrapper>
  );
};
