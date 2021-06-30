import React, { useState } from 'react';

import { RegisterScreen } from 'unauthenticated-app/register';
import { LoginScreen } from 'unauthenticated-app/login';
import { Card, Divider } from 'antd';
import bg from 'assets/img/bg.jpg';

import styled from '@emotion/styled';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);

  const registerOrLoginClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsregister(!isRegister);
  };

  return (
    <Container>
      <Card className="card">
        <h2 className="title">{isRegister ? '请注册' : '请登录'}</h2>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a href="/" onClick={(e) => registerOrLoginClick(e)}>
          {isRegister ? '已有账号？点击登录' : '没有账号？点击注册'}
        </a>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
  background-image: url(${bg});
  .card {
    width: 40rem;
    min-height: 40rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 1rem;
    text-align: center;
    .title {
      margin-bottom: 2.4rem;
      color: rgb(94, 108, 132);
    }
  }
`;
