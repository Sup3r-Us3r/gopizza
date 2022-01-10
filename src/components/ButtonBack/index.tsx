import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Wrapper,
} from './styles';

export const ButtonBack = ({ ...rest }: TouchableOpacityProps) => {
  const { COLORS } = useTheme();

  return (
    <Wrapper {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE} />
    </Wrapper>
  );
};
