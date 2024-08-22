import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../features/authSlice'; 
const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleForgotPassword = async (values) => {
    try {
      await dispatch(forgotPassword(values.email));
      message.success('Password reset email sent');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send password reset email');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">Forgot Password</Title>
      <Form
        form={form}
        name="forgot-password"
        layout="vertical"
        onFinish={handleForgotPassword}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email format!' }]}
        >
          <Input placeholder="Email" className="border-gray-300" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
