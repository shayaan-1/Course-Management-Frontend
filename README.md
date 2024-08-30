# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Course Management System
Overview
The Course Management System is a web application that allows users to manage online courses through a web interface. The system supports different user roles, such as teachers and administrators, each with specific functionalities. The application is built using React, with Ant Design for the user interface, SASS for styling, and Redux Toolkit for state management.

Features
1. Login Page
URL: /login
Description: A login page where users enter their credentials to access the course management system. Below the login form, there are options for "Forgot Password" and "Register."
Library: Ant Design components for the form and buttons.
2. Signup Page
URL: /register
Description: A signup page where users enter their credentials to create an account. After successful registration, the user is redirected to the courses listing page.
Library: Ant Design components for the form and buttons.
3. Forgot Password
URL: /forgot-password
Description: A reset password page where users can enter their email to receive a link to reset their credentials.
Library: Ant Design components for the form and buttons.
4. Teacher Role
Course Management Dashboard

URL: /manage-courses
Description: A dashboard displaying the list of courses managed by the teacher. The dashboard includes a header that shows the logged-in user's email on the left and a logout button on the right.
Library: Ant Design layout and table components.
Courses Table

Add Course
URL: /manage-courses/new
Description: A page for adding a new course. It includes fields for the course's title, author name (as a dropdown), and description.
Library: Ant Design form components.
Edit Course
URL: /manage-courses/:id
Description: A page for editing an existing course. The page is pre-populated with the course's current details. Upon clicking update, the changes are saved, and the user is navigated back to the courses table, where the updated course is displayed.
Library: Ant Design form components.
Delete Course
Action: On clicking the delete button for a course, a confirmation popup appears.
Popup: The popup asks for confirmation before removing the course from the system.
Library: Ant Design modal component.
Course Fields

Title: A text input for the course's title.
Author Name: A dropdown selection for the author's name. The author names are added by the admin.
Description: A text area for the course's description.
Library: Ant Design input components and dropdown (select) component.
5. Admin Role
Author Management Dashboard

URL: /manage-authors
Description: A dashboard displaying a list of authors. The dashboard includes a header that shows the logged-in user's email on the left and a logout button on the right.
Library: Ant Design layout and table components.
Author Fields

Name: A text input for the author's name.
Library: Ant Design input components.
User Interface Components
1. Top Header
Displays the email of the logged-in user.
Includes a logout button on the right side.
Library: Ant Design layout components.
2. Courses Table
Displays the list of courses with columns for title, author name, and description.
Library: Ant Design table component.
3. Form (Add/Edit Course)
Title: A text input for the course's title.
Author Name: A dropdown selection for the author's name.
Description: A text area for the course's description.
Library: Ant Design form components.
4. Confirmation Popup
Displays a confirmation dialog when a user attempts to delete a course.
Library: Ant Design modal component.
5. Author List
Displays the list of authors with columns for author names.
Library: Ant Design table component.
Styling
SASS: Used for managing the styles of the application, ensuring modular and maintainable CSS.
State Management
Redux Toolkit: Used for managing the application state, including handling the list of courses, course details, and user authentication state.
API Integration
Authentication API:

Used for login, signup, and forgot password functionalities.
API: FreeAPI.app
JSON Server:

Used for managing courses and authors.
API: JSONPlaceholder
Project Setup
Prerequisites
Node.js (v14 or higher)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/CourseManagementSystem.git
cd CourseManagementSystem
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Start the development server:

bash
Copy code
npm start
# or
yarn start
Access the application at http://localhost:3000.

Available Scripts
npm start: Runs the app in the development mode.
npm test: Launches the test runner in the interactive watch mode.
npm run build: Builds the app for production to the build folder.
