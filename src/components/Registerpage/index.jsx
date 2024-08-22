import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [passwordReset, setPasswordReset] = useState(false);
  const [token, setToken] = useState(null);

  const location = useLocation();

  // Extract the token from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    setToken(tokenParam);
  }, [location]);

  const handleResetPassword = (values) => {
    if (!token) {
      message.error('Invalid or missing token');
      return;
    }

    const { newPassword } = values;

    const templateParams = {
      to_email: 'user_email@example.com',  // Use the email from your application context
      new_password: newPassword,
      token: token,  // The token extracted from the URL
    };

    emailjs.send(
      'service_hhulbdi',
      'template_jocmmqd',  // Replace with your template ID for password reset
      templateParams,
      'mxAtLj58FZbHf8xO7'   // Replace with your emailjs user ID
    )
    .then((response) => {
      console.log('Password reset email sent successfully:', response.status, response.text);
      message.success('Your password has been reset successfully.');
      setPasswordReset(true);
      form.resetFields();
    })
    .catch((error) => {
      console.error('Failed to send password reset email:', error);
      message.error('Failed to reset password. Please try again.');
    });
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
        {!passwordReset ? (
          <>
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
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-700">Your password has been reset. You can now log in with your new password.</p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ResetPassword;
