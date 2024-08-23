import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourse } from '../../../features/courseSlice';
import { /*useNavigate*/ useParams } from 'react-router-dom';

const { TextArea } = Input;

const EditCourse = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const course = useSelector(state => state.courses.courses.find(c => c.id === id));

    const [form] = Form.useForm();

    useEffect(() => {
        if (course) {
            form.setFieldsValue(course);
        }
    }, [course, form]);

    const onFinish = (values) => {
        dispatch(updateCourse({ id, updatedCourse: values }));
       // navigate('/manage-courses');
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Edit Course</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
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
                    <Button type="primary" htmlType="submit">Update Course</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditCourse;
