import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const resultAction = await dispatch(login({ ...values }));
  
      if (login.fulfilled.match(resultAction)) {
        const { role } = resultAction.payload.data.user;
        message.success('Login successful');
        
        if (role === 'USER') {
          navigate('/'); // Redirect to course management dashboard
        } else if (role === 'ADMIN') {
          navigate('/manage-authors'); // Redirect to author management dashboard
        }
      } else {
        throw new Error(resultAction.error.message || 'Login failed');
      }
    } catch (error) {
      message.error(error.message || 'An error occurred during login');
    }
  };
  

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
