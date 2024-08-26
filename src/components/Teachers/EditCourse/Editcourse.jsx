import React, { useEffect } from 'react';
import CustomForm from '../../Common/CustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';  
import { updateCourse } from '../../../features/courseSlice';
import { fetchAuthors } from '../../../features/authorSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector(state => state.courses.courses.find(c => c.id === id));
  const authors = useSelector(state => state.authors.authors);

  const [form] = Form.useForm();  // Create the form instance

  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
    }
  }, [course, form]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleUpdateCourse = (values) => {
    dispatch(updateCourse({ id, updatedCourse: values }));
    navigate('/');
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

  return (
    <CustomForm
      formConfig={formConfig}
      onFinish={handleUpdateCourse}
      initialValues={course}
      form={form}  // Pass the form instance to CustomForm
      title="Edit Course"
      buttonText="Update Course"
    />
  );
};

export default EditCourse;
