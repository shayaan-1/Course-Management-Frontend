import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        // Create a new course
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        // Read all courses (could be combined with fetchCourses if using an API)
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        // Update a course by id
        updateCourse: (state, action) => {
            const { id, updatedCourse } = action.payload;
            const index = state.courses.findIndex(course => course.id === id);
            if (index !== -1) {
                state.courses[index] = updatedCourse;
            }
        },
        // Delete a course by id
        deleteCourse: (state, action) => {
            const { id } = action.payload;
            state.courses = state.courses.filter(course => course.id !== id);
        },
        // Optional: Set the loading state
        setLoading: (state) => {
            state.status = 'loading';
        },
        // Optional: Set the success state
        setSuccess: (state) => {
            state.status = 'succeeded';
        },
        // Optional: Set the failed state
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { addCourse, setCourses, updateCourse, deleteCourse, setLoading, setSuccess, setError } = courseSlice.actions;

export default courseSlice.reducer;
