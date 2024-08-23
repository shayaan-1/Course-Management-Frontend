import React from 'react';
import { Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice'; // Adjust the path as needed

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.loggedInUser?.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header className="bg-white shadow-md flex justify-between items-center p-4">
      <div className="text-black">
        <span>{email ? `Logged in as: ${email}` : 'Not logged in'}</span>
      </div>
      <div>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
