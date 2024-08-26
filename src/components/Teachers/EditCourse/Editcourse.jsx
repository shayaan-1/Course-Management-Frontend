import React, { useEffect, useState } from 'react';
import CustomForm from '../../Common/CustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { updateCourse } from '../../../features/courseSlice';
import { fetchAuthors } from '../../../features/authorSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const authors = useSelector(state => state.authors.authors);
  const courseData = useSelector(state => state.courses.courses.find(c => c.id === id));

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAuthors());
        if (courseData) {
          setCourse(courseData);
        }
      } catch (error) {
        message.error('Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, courseData]);

  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
    }
  }, [course, form]);

  const handleUpdateCourse = async (values) => {
    try {
      await dispatch(updateCourse({ id, updatedCourse: values }));
      message.success('Course updated successfully');
      navigate('/');
    } catch (error) {
      message.error('Failed to update course');
    }
  };

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

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!course) {
    return <div>Course not found</div>; 
  }

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleUpdateCourse}
      initialValues={course}
      form={form}
      title="Edit Course"
      buttonText="Update Course"
    />
  );
};

export default EditCourse;
