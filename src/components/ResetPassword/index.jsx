import React from 'react';
import CustomForm from '../Common/CustomForm';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ResetPassword = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    try {
      await dispatch(resetPassword({ token, newPassword: values.newPassword }));
      message.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      // Check if the error contains a specific message
      const errorMessage = error?.response?.data?.message || 'Failed to reset password';
      message.error(errorMessage);
    }
  };

  const formConfig = [
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'New Password',
      rules: [
        { required: true, message: 'Please input your new password!' },
        { min: 6, message: 'Password must be at least 6 characters.' }
      ]
    }
  ];

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleResetPassword}
      title="Reset Password"
      buttonText="Reset Password"
    />
  );
};

export default ResetPassword;
