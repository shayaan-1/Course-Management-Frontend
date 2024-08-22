import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../features/authSlice'; 

const { Title } = Typography;

const ResetPassword = ({ token }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleResetPassword = async (values) => {
    try {
      await dispatch(resetPassword({ token, newPassword: values.newPassword }));
      message.success('Password reset successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to reset password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">Reset Password</Title>
      <Form
        form={form}
        name="reset-password"
        layout="vertical"
        onFinish={handleResetPassword}
        className="space-y-4"
      >
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }, { min: 6, message: 'Password must be at least 6 characters.' }]}
        >
          <Input.Password placeholder="New Password" className="border-gray-300" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
