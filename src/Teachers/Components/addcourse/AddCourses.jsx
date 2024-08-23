import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../features/courseSlice';
//import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const AddCourse = () => {
    const dispatch = useDispatch();
  //  const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(addCourse(values));
       // navigate('/manage-courses');
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Add New Course</h1>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the course title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="author" label="Author Name" rules={[{ required: true, message: 'Please select the author!' }]}>
                    <Select>
                        {/* Replace with actual author names */}
                        <Select.Option value="Author 1">Author 1</Select.Option>
                        <Select.Option value="Author 2">Author 2</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the course description!' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Course</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCourse;
