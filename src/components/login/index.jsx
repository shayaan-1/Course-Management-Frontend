import React from 'react';
import CustomForm from '../Common/CustomForm';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { message, Button } from 'antd';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const resultAction = await dispatch(login(values));
  
      if (login.fulfilled.match(resultAction)) {
        const { role, message: successMessage } = resultAction.payload.data.user;
        
        message.success(successMessage || 'Login successful');
  
        // Role-based redirection
        navigate(role === 'ADMIN' ? '/manage-authors' : '/');
      } else {
        const errorMessage = resultAction.error?.message || 'Login failed';
        message.error(errorMessage);
      }
    } catch (error) {
      message.error(error.message || 'An unexpected error occurred. Please try again.');
    }
  };
  

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const formConfig = [
    {
      name: 'username',
      label: 'Username',
      type: 'input',
      placeholder: 'Username',
      rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      rules: [{ required: true, message: 'Please input your password!' }]
    },
    {
      type: 'custom',
      render: () => (
        <div className="flex justify-between mt-4">
          <Button type="link" onClick={handleRegister} className="text-blue-500">
            Register
          </Button>
          <Button type="link" onClick={handleForgotPassword} className="text-blue-500">
            Forgot Password
          </Button>
        </div>
      )
    }
  ];

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleLogin}
      title="Login"
      buttonText="Login"
    />
  );
};

export default LoginForm;
