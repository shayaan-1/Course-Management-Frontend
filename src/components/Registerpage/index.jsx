import React, { useState, useCallback } from 'react';
import CustomForm from '../Common/CustomForm';
import { useDispatch } from 'react-redux';
import { register } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const RegisterForm = () => {
  const [role, setRole] = useState('USER'); // Default role is 'USER'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = useCallback(async (values) => {
    try {
      const resultAction = await dispatch(register({ ...values, role }));

      if (register.fulfilled.match(resultAction)) {
        message.success('Registration successful');
        navigate('/login');
      } else {
        throw new Error(resultAction.error?.message || 'Registration failed');
      }
    } catch (error) {
      message.error(error.message || 'An unexpected error occurred. Please try again.');
    }
  }, [dispatch, navigate, role]);

  const formConfig = [
    {
      name: 'username',
      label: 'Username',
      type: 'input',
      placeholder: 'Username',
      rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'Email',
      rules: [{ required: true, message: 'Please input your email!', type: 'email' }]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      rules: [{ required: true, message: 'Please input your password!' }]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      value: role,
      onChange: (e) => setRole(e.target.value),
      options: [
        { label: 'Teacher', value: 'USER' },
        { label: 'Admin', value: 'ADMIN' }
      ]
    }
  ];

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleRegister}
      title="Register"
      buttonText="Register"
    />
  );
};

export default RegisterForm;
