import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Wrapper,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusTypesProps,
  StatusLabel,
} from './styles';

export type OrderProps = {
  id: string;
  pizza: string;
  size: string;
  image: string;
  table_number: string;
  status: StatusTypesProps;
  waiter_id: string;
  quantity: number;
  amount: number;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

export const OrderCard = ({ index, data, ...rest }: Props) => {
  return (
    <Wrapper index={index} {...rest}>
      <Image source={{ uri: data?.image }} />

      <Name>{data?.pizza}</Name>

      <Description>
        Mesa {data?.table_number} ⚬ Qnt: {data?.quantity}
      </Description>

      <StatusContainer status={data?.status}>
        <StatusLabel status={data?.status}>{data?.status}</StatusLabel>
      </StatusContainer>
    </Wrapper>
  );
};
