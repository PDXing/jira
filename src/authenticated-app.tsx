import React from 'react';
import { useAuth } from 'context/auth-context';

import { ProjectListScreen } from 'screens/project-list';
import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { Row } from 'components/lib';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button type="link" onClick={() => logout()}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <h3>LOGO</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type="link" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Hi, {user?.name} <DownOutlined />
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
