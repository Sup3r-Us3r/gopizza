import styled, { css } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
}

export const Wrapper = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary'
    ? theme.COLORS.SECONDARY_900
    : theme.COLORS.PRIMARY_50
} as TextInputProps))<Props>`
  width: 100%;
  height: 56px;
  background: transparent;
  border-radius: 12px;
  font-size: 12px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE}
  `}
`;
