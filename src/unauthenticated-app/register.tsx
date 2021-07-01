import React from 'react';
import { useAuth } from 'context/auth-context';

import { Button, Form, Input } from 'antd';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwNewError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(register(values)).catch(onError);
  };

  return (
    <Form onFinish={(values) => handleSubmit(values)}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入用密码！' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} style={{ width: '100%' }} type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
