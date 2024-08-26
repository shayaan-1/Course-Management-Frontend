import React, { useState } from 'react';
import CustomForm from '../Common/CustomForm';
import emailjs from 'emailjs-com';
import { message } from 'antd';

const ForgotPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = (values) => {
    const { email } = values;

    const templateParams = {
      to_email: email,
      message: 'Click the link below to reset your password.',
      reset_link: import.meta.env.VITE_RESET_PASSWORD_LINK,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
      .then(() => {
        message.success('Password reset link sent to your email.');
        setEmailSent(true);
      })
      .catch(() => {
        message.error('Failed to send password reset link. Please try again.');
      });
  };

  const formConfig = [
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'Email',
      rules: [{ required: true, message: 'Please input your email!', type: 'email' }]
    }
  ];

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleForgotPassword}
      title="Forgot Password"
      buttonText="Send Reset Link"
    />
  );
};

export default ForgotPasswordForm;
