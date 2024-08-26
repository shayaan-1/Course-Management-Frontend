import React, { useEffect, useState } from 'react';
import CustomForm from '../../Common/CustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../../features/authorSlice';
import { addCourse } from '../../../features/courseSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authors = useSelector(state => state.authors.authors);
  const fetchAuthorsStatus = useSelector(state => state.authors.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAuthors());
      } catch (error) {
        message.error('Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleAddCourse = async (values) => {
    try {
      await dispatch(addCourse(values));
      message.success('Course added successfully');
      navigate('/');
    } catch (error) {
      message.error('Failed to add course');
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  const formConfig = [
    {
      name: 'title',
      label: 'Title',
      type: 'input',
      placeholder: 'Course Title',
      rules: [{ required: true, message: 'Please input the course title!' }]
    },
    {
      name: 'authorId',
      label: 'Author Name',
      type: 'select',
      placeholder: 'Select Author',
      options: authors.map(author => ({ label: author.name, value: author.id })),
      rules: [{ required: true, message: 'Please select the author!' }]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Course Description',
      rules: [{ required: true, message: 'Please input the course description!' }]
    }
  ];

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleAddCourse}
      title="Add New Course"
      buttonText="Add Course"
    />
  );
};

export default AddCourse;
