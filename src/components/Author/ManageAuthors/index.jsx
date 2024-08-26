import React, { useEffect, useState } from 'react';
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

  const handleAddAuthor = () => {
    if (name.trim()) {
      dispatch(addAuthor({ name }));
      setName('');
    }
  };

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
        {/* Table Component */}
        <DataTable
          columns={columns}
          dataSource={authors}
          loading={loading}
        />
        {/* Input and Button for adding authors */}
        <Space>
          <Input 
            placeholder="Enter author name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-80"
          />
          <Button 
            type="primary" 
            onClick={handleAddAuthor} 
            className="bg-blue-500 text-white">
            Add Author
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default ManageAuthors;
