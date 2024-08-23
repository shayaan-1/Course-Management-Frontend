import React from 'react';
import { Table, Button, Modal } from 'antd';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse } from '../../../features/courseSlice'; // Assuming the courseSlice is set up as before

const CourseManagement = () => {
  //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses);
    const userEmail = useSelector(state => state.auth.loggedInUser?.email || 'No Email');

    const handleAddCourse = () => {
    //    navigate('/manage-courses/new');
    };

    const handleEditCourse = (id) => {
      //  navigate(`/manage-courses/${id}`);
    };

    const handleDeleteCourse = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this course?',
            onOk: () => dispatch(deleteCourse({ id })),
        });
    };

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEditCourse(record.id)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteCourse(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>{userEmail}</div>
                <Button type="primary" onClick={handleAddCourse}>Add Course</Button>
            </div>
            <Table dataSource={courses} columns={columns} rowKey="id" />
        </div>
    );
};

export default CourseManagement;
