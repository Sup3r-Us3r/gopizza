import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Wrapper,
  TypeProps,
  Load,
  Title,
} from './styles';

type Props = RectButtonProps & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
};

export const Button = ({
  title,
  type = 'primary',
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <Wrapper type={type} enabled={!isLoading} {...rest}>
      { isLoading ? <Load /> : <Title>{title}</Title> }
    </Wrapper>
  );
};
