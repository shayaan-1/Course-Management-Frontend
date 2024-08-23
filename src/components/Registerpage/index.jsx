import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { register } from '../../features/authSlice';

const { Title } = Typography;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();

  const handleRegister = (values) => { //removed unnecessary async
    try {
      dispatch(register({ ...values, role }));
      message.success('Registration successful');
      form.resetFields(); 
    } catch (error) {
      message.error('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">Register</Title>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={handleRegister}
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
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder="Email" className="border-gray-300" />
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
            <Radio value="user">Teacher</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
