import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../../features/authorSlice';
import { addCourse } from '../../../features/courseSlice';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const AddCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authors = useSelector(state => state.authors.authors);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const onFinish = (values) => {
        dispatch(addCourse(values));
        navigate('/');
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Add New Course</h1>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the course title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="authorId" label="Author Name" rules={[{ required: true, message: 'Please select the author!' }]}>
                    <Select>
                        {authors.map(author => (
                            <Select.Option key={author.id} value={author.id}>
                                {author.name}
                            </Select.Option>
                        ))}
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
