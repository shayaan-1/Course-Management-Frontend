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
      const resultAction = await dispatch(login({ ...values }));

      if (login.fulfilled.match(resultAction)) {
        const { role } = resultAction.payload.data.user;
        message.success('Login successful');

        if (role === 'USER') {
          navigate('/');
        } else if (role === 'ADMIN') {
          navigate('/manage-authors');
        }
      } else {
        throw new Error(resultAction.error.message || 'Login failed');
      }
    } catch (error) {
      message.error(error.message || 'An error occurred during login');
    }
  };

  // const handleLogin = async (values) => {
  //   try {
  //     const response = dispatch(login({ ...values })); // Assume loginAPI is your API call
  //     if (response && response.message) {
  //       message.success(response.message);
  //     } else {
  //       message.error('Login successful, but no message received.');
  //     }
  //   } catch (error) {
  //     if (error && error.message) {
  //       message.error(error.message);
  //     } else {
  //       message.error('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // };
  

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
