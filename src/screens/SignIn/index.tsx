import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useAuth } from '@hooks/auth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import brandImg from '@assets/brand.png';

import {
  Wrapper,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles';

export const SignIn = () => {
  const { signIn, forgotPassword, isLogging } = useAuth();

  const [email, setEmail] = useState<string>('maydersonmello@gmail.com');
  const [password, setPassword] = useState<string>('123456');

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Wrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            <Brand source={brandImg} />

            <Title>Login</Title>

            <Input
              placeholder="E-mail"
              type="secondary"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <Input
              placeholder="Senha"
              type="secondary"
              secureTextEntry
              onChangeText={setPassword}
            />

            <ForgotPasswordButton onPress={handleForgotPassword}>
              <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
            </ForgotPasswordButton>

            <Button
              title="Entrar"
              type="secondary"
              isLoading={isLogging}
              onPress={handleSignIn}
            />
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};
