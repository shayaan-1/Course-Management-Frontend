// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LoginForm from './components/login'
// import RegisterForm from './components/Registerpage/RegisterForm'
// import ForgotPasswordForm from './components/forgotpage/Forgotpage'

// function App() {
//   return (<>
    
//     <ForgotPasswordForm/>
//  </> )
// }

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LoginForm from './components/login'
// import RegisterForm from './components/Registerpage'

// function App() {
//   return (<>
//     <RegisterForm/>
//  </> )
// }

// export default App;


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css'; 
import './index.css'; 
import ResetPassword from '../src/components/ResetPassword'; 
import ForgotPasswordForm from '../src/components/ForgotPassword';
import LoginForm from './components/login';
import RegisterForm from './components/Registerpage';
import CourseManagement from './Teachers/Components/ManageCourses/ManageCourse';
import AddCourse from './Teachers/Components/addcourse/AddCourses';
import EditCourse from './Teachers/Components/editcourse/EditCourse';

const App = () => (
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<CourseManagement/>} />
  //     <Route path="/reset-password" element={<ResetPassword />} />
  //   </Routes>
  // </Router>
 <CourseManagement/>
 //<AddCourse/>
  //<EditCourse/>
);

export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
