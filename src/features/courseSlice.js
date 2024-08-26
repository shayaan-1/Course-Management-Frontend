import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COURSE_API_BASE_URL = 'http://localhost:8000/courses';


// Thunk to fetch all courses
export const fetchCourses = createAsyncThunk(`${COURSE_API_BASE_URL}/fetchCourses`, async () => {
    const response = await axios.get(COURSE_API_BASE_URL);
    return response.data;
});

// Thunk to add a new course
export const addCourse = createAsyncThunk(`${COURSE_API_BASE_URL}/addCourse`, async (course) => {
    const response = await axios.post(COURSE_API_BASE_URL, course);
    return response.data;
});

// Thunk to update an existing course by id
export const updateCourse = createAsyncThunk(`${COURSE_API_BASE_URL}/updateCourse`, async ({ id, updatedCourse }) => {
    const response = await axios.put(`${COURSE_API_BASE_URL}/${id}`, updatedCourse);
    return response.data;
});

// Thunk to delete a course by id
export const deleteCourse = createAsyncThunk(`${COURSE_API_BASE_URL}/deleteCourse`, async (id) => {
    await axios.delete(`${COURSE_API_BASE_URL}/${id}`);
    return id;
});

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        status: 'idle', 
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.courses.findIndex(course => course.id === action.payload.id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter(course => course.id !== action.payload);
            });
    },
});

export default courseSlice.reducer;
