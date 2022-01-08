import React from 'react';
import { TextInputProps } from 'react-native';

import {
  Wrapper,
  TypeProps,
} from './styles';

type Props = TextInputProps & {
  type?: TypeProps;
}

export const Input = ({ type = 'primary', ...rest }: Props) => {
  return (
    <Wrapper type={type} {...rest} />
  );
};
