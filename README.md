# Course Management System

A web application for managing online courses, supporting roles like teachers and administrators. Built with **React**, **Ant Design**, and **Redux Toolkit**.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Authentication
- **Login Page**: Users can log in with credentials and access "Forgot Password" and "Register" options
- **Signup Page**: Allows new users to register and redirects to the courses dashboard
- **Forgot Password**: Users can reset their password by providing an email

### Teacher Dashboard
- View and manage courses
- Add, edit, and delete courses
- Logout functionality

### Admin Dashboard
- Manage authors with options to add, edit, and view a list of authors
- System-wide analytics
- User management

### Core Components
- **Courses Table**: Lists courses with columns for title, author, and description
- **Forms**:
  - Course Form: Includes title, author dropdown, and description
  - Author Form: Input for author names
- **Confirmation Popup**: Appears before deleting courses or authors

## Technologies Used

### Frontend
- React 18
- Ant Design UI Library
- SASS for styling
- Redux Toolkit for state management

### API Integration
- FreeAPI.app for authentication
- JSONPlaceholder for mock data

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CourseManagementSystem.git
cd CourseManagementSystem
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Development Mode

1. Start the development server:
```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Use the following test credentials:
   - Teacher: `teacher@example.com` / `password123`
   - Admin: `admin@example.com` / `password123`

## Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Executes the test suite
- `npm run build` - Creates a production build
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
