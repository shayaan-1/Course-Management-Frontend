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
import ForgotPassword from '../src/components/ForgotPassword'; 
import ResetPassword from '../src/components/ResetPassword'; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </Router>
);

export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
