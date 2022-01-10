import React from 'react';

import {
  Wrapper,
  Title,
  Notification,
  Quantity,
} from './styles';

type Props = {
  title: string;
  color: string;
  notifications?: string;
};

export const BottomMenu = ({ title, color, notifications }: Props) => {
  const noNotifications = notifications === '0';

  return (
    <Wrapper>
      <Title color={color}>{title}</Title>

      {
        notifications &&
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>
            {notifications}
          </Quantity>
        </Notification>
      }
    </Wrapper>
  );
};
