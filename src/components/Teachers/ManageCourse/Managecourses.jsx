import React, { useEffect, useState } from 'react';
import { Button, Modal, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, fetchCourses } from '../../../features/courseSlice';
import { fetchAuthors } from '../../../features/authorSlice';
import DataTable from '../../Common/DataTable'; 

const CourseManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [authorsMap, setAuthorsMap] = useState(new Map());

    const courses = useSelector(state => state.courses.courses);
    const authors = useSelector(state => state.authors.authors);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchCourses());
                await dispatch(fetchAuthors());
                // Create a map for faster author lookup 
                setAuthorsMap(new Map(authors.map(author => [author.id, author.name])));
            } catch (error) {
                message.error('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, authors]);

    const getAuthorNameById = (authorId) => {
        return authorsMap.get(authorId) || 'Unknown Author';
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
            onOk: async () => {
                try {
                    await dispatch(deleteCourse(id));
                    message.success('Course deleted successfully');
                } catch (error) {
                    message.error('Failed to delete course');
                }
            },
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

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div>
            <Button 
                type="primary" 
                onClick={handleAddCourse} 
                style={{ marginBottom: 16 }}
            >
                Add Course
            </Button>
            <DataTable
              columns={columns}
              dataSource={courses}
            />
        </div>
    );
};

export default CourseManagement;
