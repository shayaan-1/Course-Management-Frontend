import React, {useEffect}from 'react';
import { Table, Button, Modal } from 'antd';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, fetchCourses } from '../../../features/courseSlice';

const CourseManagement = () => {
  //  const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourses());
      }, [dispatch]);
    //console.log(courses);//check
    const courses = useSelector(state => state.courses.courses);

    const handleAddCourse = () => {
    //    navigate('/manage-courses/new');
    };

    const handleEditCourse = () => {
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
            dataIndex: 'title',
            key: 'title',
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
                <Button type="primary" onClick={handleAddCourse}>Add Course</Button>
            </div>
            <Table dataSource={courses} columns={columns} rowKey="id" />
        </div>
    );
};

export default CourseManagement;
