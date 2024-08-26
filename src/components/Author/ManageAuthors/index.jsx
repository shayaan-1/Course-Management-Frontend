import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Space } from 'antd';
import DataTable from '../../Common/DataTable'; 
import { fetchAuthors, addAuthor } from '../../../features/authorSlice';

const ManageAuthors = () => {
  const dispatch = useDispatch();
  const { authors, loading } = useSelector((state) => state.authors);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleAddAuthor = useCallback(() => {
    const trimmedName = name.trim();
    if (trimmedName) {
      dispatch(addAuthor({ name: trimmedName }));
      setName('');
    }
  }, [dispatch, name]);

  const columns = [
    {
      title: 'Author Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div className="p-8">
      <Space direction="vertical" className="w-full">
        <DataTable
          columns={columns}
          dataSource={authors}
          loading={loading}
        />
        <Space>
          <Input 
            placeholder="Enter author name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPressEnter={handleAddAuthor} // Allow submission with Enter key
            className="w-80"
          />
          <Button 
            type="primary" 
            onClick={handleAddAuthor} 
            disabled={!name.trim()} // Disable button if input is empty
            className="bg-blue-500 text-white">
            Add Author
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default ManageAuthors;
