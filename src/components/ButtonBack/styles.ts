import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

export const Wrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
} as TouchableOpacityProps)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;
