import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/reset.css';
import './index.css';
import ForgotPasswordForm from '../src/components/ForgotPassword';
import LoginForm from './components/login';
import RegisterForm from './components/Registerpage';
import CourseManagement from './components/Teachers/ManageCourse/Managecourses';
import EditCourse from './components/Teachers/EditCourse/Editcourse';
import AppLayout from './AppLayout/DashboardLayout';
import FormLayout from './AppLayout/FormLayout';  
import ManageAuthors from './components/Author/ManageAuthors';
import AddCourse from './components/Teachers/AddCourse/Addcourse';
import ResetPassword from './components/ResetPassword';

const ProtectedRoute = ({ element, role }) => {
  const { user, accessToken } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Role-based redirection
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'ADMIN' ? '/manage-authors' : '/'} />;
  }

  return <AppLayout>{element}</AppLayout>;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <FormLayout>
        <LoginForm />
      </FormLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <FormLayout>
        <RegisterForm />
      </FormLayout>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <FormLayout>
        <ForgotPasswordForm />
      </FormLayout>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <FormLayout>
        <ResetPassword />
      </FormLayout>
    ),
  },
  {
    path: '/',
    element: <ProtectedRoute element={<CourseManagement />} role="USER" />,
  },
  {
    path: '/manage-courses/new',
    element: <ProtectedRoute element={<AddCourse />} role="USER" />,
  },
  {
    path: '/manage-courses/:id',
    element: <ProtectedRoute element={<EditCourse />} role="USER" />,
  },
  {
    path: '/manage-authors',
    element: <ProtectedRoute element={<ManageAuthors />} role="ADMIN" />,
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;
