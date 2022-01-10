import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Wrapper,
  Title,
  Radio,
  RadioButtonProps,
  Selected,
} from './styles';

type Props = TouchableOpacityProps & RadioButtonProps & {
  title: string;
}

export const RadioButton = ({ title, selected = false, ...rest }: Props) => {
  return (
    <Wrapper selected {...rest}>
      <Radio>{selected && <Selected />}</Radio>

      <Title>{title}</Title>
    </Wrapper>
  );
};
