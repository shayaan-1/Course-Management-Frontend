import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, fetchCourses } from '../../../features/courseSlice';
import { fetchAuthors } from '../../../features/authorSlice';
import DataTable from '../../Common/DataTable'; 

const CourseManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchAuthors());
    }, [dispatch]);

    const courses = useSelector(state => state.courses.courses);
    const authors = useSelector(state => state.authors.authors);

    const getAuthorNameById = (authorId) => {
        const author = authors.find(author => author.id === authorId);
        return author ? author.name : 'Unknown Author';
    };

    const handleAddCourse = () => {
        navigate('/manage-courses/new');
    };

    const handleEditCourse = (id) => {
        navigate(`/manage-courses/${id}`);
    };

    const handleDeleteCourse = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this course?',
            onOk: () => dispatch(deleteCourse(id)),
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
            key: 'author',
            render: (_, record) => getAuthorNameById(record.authorId),
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
        <DataTable
          columns={columns}
          dataSource={courses}
          onAdd={handleAddCourse}
          addButtonLabel="Add Course"
        />
    );
};

export default CourseManagement;
