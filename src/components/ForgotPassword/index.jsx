import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import emailjs from 'emailjs-com';

const { Title } = Typography;

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = (values) => {
    const { email } = values;

    const templateParams = {
      to_email: email,
      message: 'Click the link below to reset your password.',
      reset_link: 'https//localhost:5173/reset-password', // Replace with your reset link
    };

    emailjs.send(
      'service_hhulbdi',   // Replace with your EmailJS service ID
      'template_jocmmqd',  // Replace with your EmailJS template ID
      templateParams,
      'mxAtLj58FZbHf8xO7'       // Replace with your EmailJS user ID (public key)
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      message.success('Password reset link sent to your email.');
      setEmailSent(true);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      message.error('Failed to send password reset link. Please try again.');
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">Forgot Password</Title>
      <Form
        form={form}
        name="forgotPassword"
        layout="vertical"
        onFinish={handleForgotPassword}
        className="space-y-4"
      >
        {!emailSent ? (
          <>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input placeholder="Email" className="border-gray-300" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Send Reset Link
              </Button>
            </Form.Item>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-700">If the email exists, you will receive a password reset link shortly.</p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
