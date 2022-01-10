import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Wrapper,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Line,
} from './styles';

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = RectButtonProps & {
  data: ProductProps;
};

export const ProductCard = ({ data, ...rest }: Props) => {
  const { COLORS } = useTheme();

  return (
    <Wrapper>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Wrapper>
  );
};
