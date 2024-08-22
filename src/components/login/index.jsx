import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice'; 

const { Title } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      await dispatch(login({ ...values, role }));
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
  };

  const handleRegister = () => {
    // Handle registration logic
    message.info('Redirect to registration page');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    message.info('Redirect to forgot password page');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">Login</Title>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={handleLogin}
        className="space-y-4"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" className="border-gray-300" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" className="border-gray-300" />
        </Form.Item>

        <Form.Item label="Role">
          <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Login
          </Button>
        </Form.Item>

        <div className="flex justify-between mt-4">
          <Button type="link" onClick={handleRegister} className="text-blue-500">
            Register
          </Button>
          <Button type="link" onClick={handleForgotPassword} className="text-blue-500">
            Forgot Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
